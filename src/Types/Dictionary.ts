// export class Dictionary<T>
// {
//   private dict: {[key: string]: T};
//   constructor()
//   { }
//   public Add(key: string, value: T)
//   {
//     this.dict[key] = value;
//   }
//   public Map<T>(callback: (key: string, value: T, index: number) => T): T[]
//   { 
//     const out: T[] = [];
//     let i=0;
//     // for (let k in this.dict)
//     const keys = Object.keys(this.dict);
//     keys.forEach(k=>
//     {
//       const r = callback(k, this.dict[k], i++);
//       out.push(r);
//     });
//     return out;
//   }
// }
export type Dictionary<K extends string, T> = {
  [key: string]: T;
};
