import "./ExpenseTitle.css";

const ExpenseTitle = (props) => {
  const title = props.title;
  return <h2>{title}</h2>;
};
export default ExpenseTitle;