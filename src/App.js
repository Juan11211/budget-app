import Container from  'react-bootstrap/Container'
import {Button, Stack} from 'react-bootstrap'
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal'
import UncatergorizeBudgetCard from './components/UncatergorizeBudgetCard';
import {useState} from 'react' 
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './context/BudgetsContext';

import './App.css';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpenseModal from './components/ViewExpenseModal';

function App() {
  // state for add expenses 
  const [showAddBudgetModal ,setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal ,setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  // bringing in budgets 
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId){ 
      setShowAddExpenseModal(true)
      setAddExpenseModalBudgetId(budgetId)
  }


  return (
    <>
    <div className="App">
     <Container className='my-4'> 
     {/* Stack is items in the container */}
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budget</h1>
        <Button onClick={() => setShowAddBudgetModal(true)} variant='primary'>Add Budget</Button>
        <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
      </Stack>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax:(300px, 1fr))', gap: '1rem', alignItems: 'flex-start'}}
      >
       {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            // this is the budget card. could view expenses
          return ( 
        <BudgetCard 
        key={budget.id}
        name={budget.name} 
        amount={amount} 
        max={budget.max}
        onAddExpenseClick={() => openAddExpenseModal(budget.id)}
        onViewExpensesClick={() => 
          setViewExpensesModalBudgetId(budget.id)}        
        />
        )
        })}
        <UncatergorizeBudgetCard openAddExpenseClick={() => openAddExpenseModal}
        onViewExpensesClick={() => 
          setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
        <TotalBudgetCard />
      </div>

     </Container>
     <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
     <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId}
       handleClose={() => setShowAddExpenseModal(false)} />
        <ViewExpenseModal budgetId={viewExpensesModalBudgetId} 
       handleClose={() => setViewExpensesModalBudgetId()} />
    </div>
    </>
  );
}

export default App;
