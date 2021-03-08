export class Employee {
    id:string;
    username:string;
    email:string;
    age:number;
    designation:string;

    constructor(id:string = "",
        username:string = "",
        email:string = "",
        age:number = 0,
        designation:string = ""){
            this.id = id;
            this.username = username;
            this.email = email;
            this.age = age;
            this.designation = designation;
        }
}