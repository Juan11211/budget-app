import React from 'react'
import { Form, Modal, Button} from 'react-bootstrap'
import { useRef } from 'react'
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from '../context/BudgetsContext'
                                            // default budget sets 
const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => { 
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const {addExpense, budgets    } = useBudgets()

    function handleSubmit(e){
    e.preventDefault()
    addExpense( 
        {
            description: descriptionRef.current.value,
            budgetId: budgetIdRef.current.value,
            amount: parseFloat(amountRef.current.value)
        })
        handleClose()
    }
    return (
        <Modal show={show} onHide={handleClose}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control ref={descriptionRef} type="text" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  ref={amountRef} // referencing the amount 
                  type="number"
                  required
                  min={0} // starts @ $0
                  step={0.01} // how many times we can increase the step
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="budgetId">
                <Form.Label>Budget</Form.Label>

                {/* select the category to put the budget in */}
                <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                  <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
                  {budgets.map(budget => (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-flex justify-content-end">
                  {/* primary variant is blue */}
                <Button variant="primary" type="submit">
                  Add
                </Button>
              </div>
            </Modal.Body>
          </Form>
        </Modal>
      )
    }


export default AddExpenseModal;