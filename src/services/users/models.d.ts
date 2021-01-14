export interface UserCreateDto {
  email: string;
  password: string;
  repeatedPassword: string;
  firstName: string;
  lastName: string;
  country: string;
  about?: string;
  pinCode: string;
  shortCountry: string;
}

export interface UserUpdateDto {
  currentPassword?: string;
  newPassword?: string;
  repeatedPassword?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  about?: string;
  imageName?: string;
}
