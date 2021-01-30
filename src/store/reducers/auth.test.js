import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/",
    };
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should store the token", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: "some-id-token",
        userId: "some-user-id",
      })
    ).toEqual({
      ...initialState,
      token: "some-id-token",
      userId: "some-user-id",
    });
  });
});
