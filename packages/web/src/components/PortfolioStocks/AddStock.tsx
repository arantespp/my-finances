/** @format */

// /** @format */

// import * as React from 'react';

// import { utc } from 'moment';
// import { MutationFn, MutationUpdaterFn } from 'react-apollo';
// import DatePicker from 'react-datepicker';

// import InputNumber from '@components/InputNumber';

// import { PortfolioStockType } from '@graphql/enums';
// import {
//   ADD_PORTFOLIO_STOCK_MUTATION,
//   AddPortfolioStockMutation,
//   AddPortfolioStockMutationResponse,
//   AddPortfolioStockMutationVariables,
// } from '@graphql/mutations/add-portfolio-stock';
// import { ALL_REGISTERED_STOCKS_QUERY, AllRegisteredStocksQuery } from '@graphql/queries/all-registered-stocks';
// import { PORTFOLIO_STOCKS_QUERY, PortfolioQueryResponse, PortfolioQueryVariables } from '@graphql/queries/portfolio';
// import { StockMetadata } from '@graphql/types';

// interface Props {
//   portfolioId: string;
// }

// interface State {
//   date: string;
//   ticker: string;
//   value: number | string;
//   quantity: number | string;
//   type: PortfolioStockType;
// }

// const dateFormat = 'YYYY-MM-DD';

// class AddStock extends React.Component<Props, State> {
//   state = {
//     date: utc().format(dateFormat),
//     ticker: '',
//     value: '',
//     quantity: '',
//     type: PortfolioStockType.B,
//   };

//   render() {
//     return (
//       <AddPortfolioStockMutation mutation={ADD_PORTFOLIO_STOCK_MUTATION} update={this.update}>
//         {(addPortfolioStock, { loading }) => {
//           return (
//             <div className="AddStock">
//               <form onSubmit={this.onSubmit(addPortfolioStock)}>
//                 <div className="field is-horizontal">
//                   <div className="field-body">
//                     <div className="field">
//                       <label className="label">Data</label>
//                       <div className="control is-expanded">
//                         <DatePicker
//                           className="input"
//                           selected={new Date()}
//                           onChange={this.dateOnChange}
//                           dateFormat="dd/MM/yyyy"
//                         />
//                       </div>
//                     </div>
//                     <div className="field">
//                       <label className="label">Tipo</label>
//                       <div className="control is-expanded has-icons-left">
//                         <div className="select">
//                           <select onChange={this.portfolioStockTypeOnChange}>
//                             <option value="" />
//                             <option value={PortfolioStockType.B}>Compra</option>
//                             <option value={PortfolioStockType.S}>Venda</option>
//                             <option value={PortfolioStockType.Y}>Dividendo</option>
//                           </select>
//                         </div>
//                         <span className="icon is-small is-left">
//                           <i className="fas fa-user" />
//                         </span>
//                       </div>
//                     </div>
//                     <AllRegisteredStocksQuery query={ALL_REGISTERED_STOCKS_QUERY}>
//                       {({ data }) => {
//                         const options = data!.allRegisteredStocks || [];
//                         return (
//                           <div className="field">
//                             <label className="label">Ativo</label>
//                             <div className="control is-expanded has-icons-left">
//                               <div className="select">
//                                 <select onChange={this.tickerOnChange}>
//                                   <option />
//                                   {options.sort(this.sortStocks).map(({ ticker }, index) => {
//                                     return <option key={index}>{ticker}</option>;
//                                   })}
//                                 </select>
//                               </div>
//                               <span className="icon is-small is-left">
//                                 <i className="fas fa-user" />
//                               </span>
//                             </div>
//                           </div>
//                         );
//                       }}
//                     </AllRegisteredStocksQuery>

//                     <div className="field">
//                       <label className="label">Valor</label>
//                       <p className="control is-expanded has-icons-left">
//                         <InputNumber
//                           className="input"
//                           onChange={this.valueOnChange}
//                           value={this.state.value}
//                           toFixed={2}
//                         />
//                         <span className="icon is-small is-left">
//                           <i className="fas fa-user" />
//                         </span>
//                       </p>
//                     </div>
//                     <div className="field">
//                       <label className="label">Quantidade</label>
//                       <p className="control is-expanded has-icons-left">
//                         <InputNumber
//                           className="input"
//                           onChange={this.quantityOnChange}
//                           value={this.state.quantity}
//                           toFixed={0}
//                         />
//                         <span className="icon is-small is-left">
//                           <i className="fas fa-user" />
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="control button-align">
//                     <button
//                       type="submit"
//                       disabled={!this.allowSubmit()}
//                       className={`button is-primary ${loading && 'is-loading'}`}>
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           );
//         }}
//       </AddPortfolioStockMutation>
//     );
//   }

//   private sortStocks = (stockA: StockMetadata, stockB: StockMetadata): number => {
//     return stockA.ticker < stockB.ticker ? -1 : 1;
//   };

//   private update: MutationUpdaterFn<AddPortfolioStockMutationResponse> = (proxy, { data }) => {
//     const { portfolioId } = this.props;
//     const readQuery = proxy.readQuery<PortfolioQueryResponse, PortfolioQueryVariables>({
//       query: PORTFOLIO_STOCKS_QUERY,
//       variables: { portfolioId },
//     });
//     const newData: PortfolioQueryResponse = { portfolio: { ...readQuery!.portfolio, stocks: data!.addPortfolioStock } };
//     proxy.writeQuery({
//       query: PORTFOLIO_STOCKS_QUERY,
//       variables: { portfolioId },
//       data: newData,
//     });
//   };

//   private onSubmit = (
//     addPortfolioStock: MutationFn<AddPortfolioStockMutationResponse, AddPortfolioStockMutationVariables>,
//   ) => async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const { portfolioId } = this.props;
//       const { ticker, quantity, value, date, type } = this.state;
//       await addPortfolioStock({
//         variables: {
//           portfolioId,
//           data: {
//             ticker,
//             date,
//             value: Number(value),
//             quantity: Number(quantity),
//             type,
//           },
//         },
//       });
//     } catch (e) {
//       throw e;
//     }
//   };

//   private allowSubmit = (): boolean => {
//     const { ticker, quantity, value, date, type } = this.state;
//     return !!ticker && !!quantity && !!value && !!date && !!type;
//   };

//   private dateOnChange = (date: Date) => {
//     this.setState({ date: utc(date).format(dateFormat) });
//   };

//   private portfolioStockTypeOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     this.setState({ type: event.target.value as PortfolioStockType });
//   };

//   private tickerOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     this.setState({ ticker: event.target.value.toUpperCase() });
//   };

//   private valueOnChange = (value: number) => {
//     this.setState({ value });
//   };

//   private quantityOnChange = (value: number) => {
//     this.setState({ quantity: value });
//   };
// }

// export default AddStock;
