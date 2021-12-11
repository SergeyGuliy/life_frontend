import { shallowMount } from "@vue/test-utils";
import RoomInfo from "@/components/elements/Rooms/RoomInfo";

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
    expect(wrapper).toBe(true);
  });
});

// function sum(a, b) {
//   return a + b;
// }
//
// it("should", function() {
//   const res = sum(2, 5);
//   expect(res).toBe(7);
// });
