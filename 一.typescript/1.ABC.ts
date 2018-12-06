// # typescript 速览

// ## 语法

// ### 基本变量声明及类型

{
  // syntax
  // let variableName: DataType = value;
  // let variableName = <DataType>value;

  // basic
  let num: number = 1;
  let str: string = "";
  let boo: boolean = false;
  let date: Date;
  let numOrStr: number | string = "";

  // any
  let anyType: any;

  // never be assigned
  let nev: never;

  // ok
  num = 2;
  str = "2";
  boo = true;
  date = new Date();
  numOrStr = 2;
  numOrStr = "";

  // wrong
  numOrStr = false;

  // ok
  anyType = boo;
  anyType = str;
  anyType = false;

  // wrong
  num = "";
  str = 2;
  boo = 3;
  nev = 2;

  // ok
  num = anyType;
  str = anyType;
  boo = anyType;

  // wrong
  nev = anyType;
}

// ### 数组、对象

{
  // #### 对象
  const obj = {
    id: 2,
    name: "name"
  };
  // ok
  obj.id = 3;
  obj.name = "";

  // wrong
  obj.id = "";
  obj.name = 2;

  // wrong
  const obj2: typeof obj = {};

  // ok
  obj2.id = 4;

  // wrong
  obj2.name = 5;

  const obj3: {
    id?: number;
    name?: string;
  } = {};

  // ok
  obj3.id = 4;
  obj3.name = "5";

  // #### 数组
  const arr: [] = [];
  const arr2: any[] = [];

  // ##### 数组 element 的类型
  const arrNum: number[] = [];
  const arrStr: string[] = [];
  const arrMix: (string | number)[] = [];
  const arr3: { id?: number; name?: string }[] = [];
  const arr4: Array<{ id?: number; name?: string }> = [];

  // wrong
  arr.push({}); // element type is never
  arrNum.push("a");
  arrStr.push(2);

  // ok
  arrNum.push(1);
  arrStr.push("a");
  arrMix.push(1);
  arrMix.push("a");
  arr2.push({});
  arr2.push(1);
  arr3.push({});
  arr4.push({});
  arr4.push({ id: 2 });

  // wrong
  arr4.push({ id: "" });
}

// ### 函数

{
  const fun: (obj: { id?: number; name?: string }) => void = obj => {
    console.log(obj.name);
  };
  function fun2(): Array<{ id?: number; name?: string }> {
    // ok
    // return [{ }];
    // wrong
    return [{ age: 2 }];
  }
  
  // wrong
  function fun3(): void {
    return 2;
  }
  
  // well
  // ok
  const c: () => void = () => 2;

  interface Info {
    name: string;
    age: number;
  }

  // overload
  function a(name: string, age: number): Info;
  function a(info: { name: string; age: number }): Info;
  function a(a: string | Info, b?: number) {
    if (typeof a === "object" && a) {
      return a;
    }
    return {
      name: "",
      age: 1
    };
  }
}

// ### type、interface

{
  type Type1 = number | string;
  // ok
  let a: Type1 = 1;
  a = "";
  a = 2;

  type Type2 = number | boolean;
  // ok
  let b: Type2 = 1;
  b = 2;
  b = false;

  // wrong
  b = "";

  // ok
  let c: Type1 | Type2 = false;
  c = "";
  c = 2;
  c = false;

  let d: Type1 & Type2 = 2;
  // ok
  d = 3;
  // wrong
  d = "";

  interface IObj {
    id?: typeof d; // Type1 & Type2
    name?: string;
  }
  // ok
  const obj: IObj = {};
  obj.id = 2;
  // wrong
  obj.name = 2;

  interface ISubObj extends IObj {
    age: number;
  }
  // ok
  const obj2: ISubObj = {
    age: 2
  };

  interface GrandISubObj extends ISubObj, IObj {
    // wrong
    age: string;
  }

  type GrandISubObj2 = ISubObj & IObj;
  // ok
  const obj3: ISubObj = {
    age: 2
  };
}

// ### 泛型

{
  // wrong
  const c = a => a;
  // not good
  const c2 = (a: any) => a;
  // =>
  // ok
  const aa = <T>(a: T) => a;

  interface TObj<I> {
    info: I;
    id?: number;
  }

  interface IInfo {
    gender: string;
  }

  interface IInfo2 {
    age: number;
  }

  const obj: TObj<IInfo> = {
    info: {
      gender: "male"
    }
  };

  const obj2: TObj<IInfo2> = {
    info: {
      age: 2
    }
  };

  // #### 常见泛型
  type P = Promise<{}>;
}

// ### 黑科技

{
  // @ts-ignore
  // forbid!!
  const a: number = "";

  // as, as any
  interface A {
    age: number
  }
  interface B extends A {
    name: string
  }
  interface C {
    fakeAge: number
  }
  // ok
  const people: B = { age: 2, name: '2' };
  const abstractPeople: A = people as A;
  const newPeople: B = abstractPeople as B;
  // wrong
  const otherPeople: C = abstractPeople as C;
  // avoid
  const otherPeople2: C = abstractPeople as any;
  const c: string = a as any;

  // npm i @types/ModuleName --save-dev
  // ModuleName/*.d.ts
  // import 'xx/xx.d';

  // 解构
  const b = { id: 1, name: "name" };
  const { id: number, name: string } = b;
  const { id: i, name: n }: typeof b = b;
}
