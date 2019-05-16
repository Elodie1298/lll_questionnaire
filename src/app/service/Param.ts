export class Param implements JSON {
  age: number;
  activity: string;
  gender: string;


  constructor(age: number, activity: string, gender: string) {
    this.age = age;
    this.activity = activity;
    this.gender = gender;
  }

  readonly [Symbol.toStringTag]: "JSON";

  parse(text: string, reviver?: (key: any, value: any) => any): any {
  }

  stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
  stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
  stringify(value: any, replacer?: ((key: string, value: any) => any) | (number | string)[] | null, space?: string | number): string {
    return "";
  }



}
