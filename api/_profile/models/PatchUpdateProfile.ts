// payload
export interface IPatchUpdateProfileBody {
  location: string
  bio: string
  twitter: string
  instagram: string
  image: string
  backgroundImage: string
  engagements: string[]
  membersImages: string[]
  members: {
    fullname: "string"
    position: "string"
  }[]
}
