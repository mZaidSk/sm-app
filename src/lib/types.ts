// Auth
export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other",
}

export enum Status {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Banned = "BANNED",
}
export type registerUserParams = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    gender: Gender; //"Male" | "Female" | "Other"
    dob: string; // Use Date type if working with actual Date objects
    password: string;
    profilePictureUrl: string;
    status: Status; // "ACTIVE" | "INACTIVE" | "BANNED";
};
// Chat

// Post
