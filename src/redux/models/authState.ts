import User from "./User.model";
// import Notification from "../Notification.d";

export default interface AuthState {
    auth: User | undefined;
    loading: boolean;
    // notifications: Notification[];
}