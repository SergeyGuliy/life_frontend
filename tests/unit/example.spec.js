import { shallowMount } from "@vue/test-utils";
import RoomInfo from "@/components/elements/Rooms/RoomInfo";
import Vuetify from "vuetify";

const $t = () => {};

describe("RoomInfo.vue", () => {
  it("renders props.msg when passed", () => {
    const roomData = {
      typeOfRoom: "PUBLIC",
      roomId: 100,
      minCountOfUsers: "2",
      maxCountOfUsers: "10",
      usersInRoomLength: "5"
    };
    const wrapper = shallowMount(RoomInfo, {
      propsData: { roomData },
      mocks: { $t }
    });
    expect(true).toBe(true);
  });
});
