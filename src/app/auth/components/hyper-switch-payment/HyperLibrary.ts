// export function Hyper(publishableKey: string): HyperInstance {
//   return {
//     widgets(config: { appearance: any; clientSecret: string }): Widgets {
//       return {
//         create(type: string, options: any): Widget {
//           return {
//             mount(selector: string): void {
//               console.log(`Mounting widget to ${selector}`);
//             },
//           };
//         },
//       };
//     },
//   };
// }
//
// export interface HyperInstance {
//   widgets(config: { appearance: any; clientSecret: string }): Widgets;
// }
//
// export interface Widgets {
//   create(type: string, options: any): Widget;
// }
//
// export interface Widget {
//   mount(selector: string): void;
// }
