// # ts advance ?

//  typeof
{
  const people = {
    age: 0,
    name: ""
  };
  type info = typeof people;
  // ok
  const newPeople: info = {
    age: 2,
    name: "2"
  };
}

// keyof
{
  interface info {
    age: number;
    name: string;
  }
  type dataIndex = keyof info;
  // ok
  const arr: dataIndex[] = ["age", "name"];
  // wrong
  const arr2: dataIndex[] = ["age2"];
}

// in
{
  type infoKey = "age" | "name";
  type info = { [key in infoKey]: any };
  // ok
  const arr: info = { age: "", name: "" };
  // wrong
  const arr2: info = { age2: "" };
}

// ReturnType & typeof
{
  function fun(age: number, name: string) {
    return {
      age,
      name
    };
  }

  type info = ReturnType<typeof fun>;
  // ok
  const arr: info = { age: 2, name: "" };
  // wrong
  const arr2: info = { age: "2", name: "" };
}

// ### 泛型
{
  interface List<C> {
    columns: { [dataIndex in keyof C]?: any };
    renderMap?: { [dataIndex in keyof C]?: any };
  }

  interface people {
    age: number;
    name: string;
  }

  type peopleList = List<people>;
  // ok
  const peopleListColoumns: peopleList = {
    columns: {
      age: 2
    },
    renderMap: {
      age: (age: number) => age + 2
    }
  };
  // wrong
  const peopleListColoumns2: peopleList = {
    columns: {
      age: 2
    },
    renderMap: {
      age2: (age: number) => age + 2
    }
  };
}

// ### 三元操作
{
  type getType<T> = T extends Function ? T : never;
  const a = function() {};
  type A = getType<typeof a>;
  // ok
  const b: A = () => undefined;
}

// ### infer & 三元操作
{
  type getArgumentType<T> = T extends (params: infer A) => any
    ? A
    : never;
  const a = function(info: { age: number, name: string }) {}
  type params = getArgumentType<typeof a>;
  
  // ok
  const info: params = {
    age: 2,
    name: ''
  };
  // wrong
  const info2: params = {
    age: '2',
    name: ''
  };
}

// ### 全局变量
{
  // declare namespace Root {
  //   interface LocalDataMessages {
  //     antd: any
  //     messages: { [key: string]: any }
  //     lang: any
  //     locale: string
  //   }
  // }

  // window.LocalDataMessages = {

  // }
}
