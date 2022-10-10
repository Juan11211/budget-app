import React from 'react'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetsContext';
import BudgetCard from './BudgetCard';

function UncatergorizeBudgetCard(props) {
    const {getBudgetExpenses} = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
      )
      if(amount === 0) return null 
    return (
        <BudgetCard amount={amount} name='uncategorized' gray {...props} />
    )
}

export default UncatergorizeBudgetCard; 
