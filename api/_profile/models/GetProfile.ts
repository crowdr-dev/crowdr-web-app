// payload
export interface IGetProfilePath {
  userId: string
}

// response
export interface IGetProfileResponse {
  success: boolean;
  message: string;
  data:    IGetProfileResponseData;
}

export interface IGetProfileResponseData {
  _id:             string;
  user:            User;
  location:        string | null;
  bio:             string | null;
  instagram:       string | null;
  twitter:         string | null;
  image:           BackgroundImage;
  backgroundImage: BackgroundImage;
  engagements:     BackgroundImage[];
  createdAt:       Date;
  updatedAt:       Date;
  __v:             number;
  members:         Member[];
  id:              string;
}

export interface BackgroundImage {
  _id:       string;
  url:       string;
  public_id: string;
  tags:      string[];
  __v:       number;
  createdAt: Date;
  updatedAt: Date;
  id:        string;
}

export interface Member {
  fullname: string;
  position: string;
  image?:   BackgroundImage;
}

export interface User {
  _id:             string;
  userType:        string;
  email:           string;
  interests:       string[];
  referrer:        string;
  isAdmin:         boolean;
  isEmailVerified: boolean;
  isDeleted:       boolean;
  fullName:        string;
  gender:          string;
  tipsEmailSent:   boolean;
}
