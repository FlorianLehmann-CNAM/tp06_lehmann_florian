export class User{
  Id: number;
  Name: string;
  Surname: string;
  Address: string;
  PostalCode: string;
  City: string;
  MobilePhone: string;
  Mail: string;
  Country: string;
  Gender: string;
  Login : string;
  Password: string;

  constructor(id : number, name: string, surname: string, address: string, postalcode: string, city: string, mobilephone: string, mail: string, country: string, gender: string, login: string, password: string){
    this.Id = id;
    this.Name = name;
    this.Surname = surname;
    this.Address = address;
    this.PostalCode = postalcode;
    this.City = city;
    this.MobilePhone = mobilephone;
    this.Mail = mail;
    this.Country = country;
    this.Gender = gender;
    this.Login = login;
    this.Password = password;
  }
}