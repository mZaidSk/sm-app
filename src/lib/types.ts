// Auth

export type registerUserParams =  {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    gender: "Male" | "Female" | "Other"
    dob: string; // Use Date type if working with actual Date objects
    password: string;
    profilePictureUrl: string;
    status: "ACTIVE" | "INACTIVE" | "BANNED"; 
}
// Chat

// Post