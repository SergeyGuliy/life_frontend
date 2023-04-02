import { onMounted } from "vue";

import {
  API_getGlobalMessages,
  API_getPrivateMessages,
  API_getRoomMessages,
} from "@api";

import {
  rooms_userLeaveRoom,
  rooms_userJoinRoom,
} from "@constants/ws/rooms.mjs";
import { MESSAGE_RECEIVER_TYPES } from "@enums/index.mjs";
import { chat_messageToClient } from "@constants/ws/chats.mjs";

import { useChatKeys, useBus, useSocket, useUsers } from "@composable";
import { useStoreChats, useStoreDictionaries } from "@stores";

const { GLOBAL, ROOM, PRIVATE } = MESSAGE_RECEIVER_TYPES;

export function useChatLogic() {
  const { busInit, busEmit } = useBus();
  const { getUserChatKey } = useChatKeys();
  const { onSocketInit } = useSocket();
  const { myUser } = useUsers();
  const { getUserById } = useStoreDictionaries();
  const { chats, pushMessageToChatChat, setChat, deleteChat } = useStoreChats();

  onMounted(async () => {
    await fetchGlobalMessages();
    await fetchPrivateMessages();
    await fetchRoomMessages();

    busInit({ writeMessage });

    onSocketInit({
      [chat_messageToClient]: messageToClient,
      [rooms_userLeaveRoom]: userLeaveRoom,
      [rooms_userJoinRoom]: fetchRoomMessages,
    });
  });

  async function writeMessage(userId) {
    await createUserChat(userId);
    const chatTab = getUserChatKey(userId);
    busEmit("openChat");
    busEmit("activateChat", chatTab);
  }

  async function messageToClient(messageToClient) {
    const { messageSender, messageReceiverType, messageReceiverUserId } =
      messageToClient;
    if (messageReceiverType === GLOBAL) {
      pushMessageToChatChat(GLOBAL, messageToClient);
    } else if (messageReceiverType === ROOM) {
      pushMessageToChatChat(ROOM, messageToClient);
    } else if (messageReceiverType === PRIVATE && messageReceiverUserId) {
      const userId =
        messageSender.userId === myUser.userId
          ? messageReceiverUserId
          : messageSender.userId;
      await createUserChat(userId);
      const userChatKey = getUserChatKey(userId);
      pushMessageToChatChat(userChatKey, messageToClient);
    }
  }

  async function createUserChat(userId) {
    const userChatKey = getUserChatKey(userId);
    if (!chats[userChatKey]) {
      setChat(userChatKey, {
        messages: [],
        key: PRIVATE,
        userId,
        userData: await getUserById(userId),
      });
    }
  }

  async function fetchGlobalMessages() {
    API_getGlobalMessages().then((messages) => {
      setChat(GLOBAL, {
        key: GLOBAL,
        messages,
      });
    });
  }
  async function fetchPrivateMessages() {
    const messages = await API_getPrivateMessages();
    const messageWithUsers = messages.filter(
      (message) => message.messageReceiverUserId
    );
    const usersIds = [];
    messageWithUsers.forEach((message) => {
      if (!usersIds.includes(message.messageReceiverUserId)) {
        if (message.messageReceiverUserId !== myUser.userId) {
          usersIds.push(message.messageReceiverUserId);
        } else {
          usersIds.push(message.messageSender.userId);
        }
      }
    });
    for (let userId of usersIds) {
      let user = messageWithUsers.find(
        (message) =>
          message.messageReceiverUserId === userId ||
          message.messageSender.userId === userId
      );
      await createUserChat(userId);
      const userChatKey = getUserChatKey(userId);
      setChat(userChatKey, {
        key: PRIVATE,
        userId:
          user.messageReceiverUserId === myUser.userId
            ? user.messageSender.userId
            : user.messageReceiverUserId,
        userData:
          user.messageReceiverUserId === myUser.userId
            ? user.messageSender
            : await getUserById(user.messageReceiverUserId),
        messages: messageWithUsers.filter(
          (message) =>
            message.messageReceiverUserId === userId ||
            message.messageSender.userId === userId
        ),
      });
    }
  }
  async function fetchRoomMessages() {
    if (myUser?.roomJoinedId) {
      setChat(ROOM, {
        key: ROOM,
        messages: await API_getRoomMessages(),
        roomId: myUser.roomJoinedId,
      });
    }
  }

  function userLeaveRoom() {
    busEmit("userLeaveChat");
    deleteChat(ROOM);
  }
}
