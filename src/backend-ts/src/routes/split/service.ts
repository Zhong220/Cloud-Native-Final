import { DataModel, DtoModel, ViewModel, Record, AccountingRecord } from "./model.js";
import loginRepository from "./repository.js";

export function loginService(model: DtoModel): ViewModel {
  const result: DataModel = loginRepository(model);
  return { jwtToken: getJWTToken(result.mail) };
}

const getJWTToken = (sort: string): string => {
  return "sjlafjlaf";
};

// export function generateSplitJson(records:any) {
//   const debts:Record= [];

//   records.forEach(({ payer, attendees, price }) => {
//     // 解析參與者，包含付款者
//     const attendeesIds = attendees.split(',').map(id => parseInt(id.trim()));
//     const allParticipants = [payer, ...attendeesIds];

//     // 計算每人應付金額
//     const amountPerPerson = parseFloat((price / allParticipants.length).toFixed(2));

//     // 計算每位參與者應付金額
//     allParticipants.forEach(participant => {
//       if (participant !== payer) {
//         debts.push({
//           from: participant,
//           to: payer,
//           amount: amountPerPerson
//         });
//       }
//     });
//   });

//   return { debts };
// }
