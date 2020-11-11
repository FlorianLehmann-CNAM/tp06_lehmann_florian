export class Product{
  id: number;
  title: string;
  description: string;
  price: number;
  imgUrl : string;
  manufacturer: string;
  color : string;
  width: number;
  height: number;
  garantie: number;

  constructor(id: number, title: string, description: string, price: number, imgUrl: string, color: string, width: number, height: number, garantie: number){
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imgUrl = imgUrl;
    this.color = color;
    this.width = width;
    this.height = height;
    this.garantie = garantie;
  }
}