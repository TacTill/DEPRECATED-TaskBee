
function RUNTREE(int) {
  return { 
    invoice: {
      uiLabel: int('invoice'),
      process : {
        collect: {
          RUN      : () => RUNTIME(RUNTREE(int).invoice.process.collect),
          uiLabel  : int('invoice_collect'),
          params   : [{INVOICE_id: ''}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e && e.amount_due > 0,
            output  : (e) => true,
          },
          funct    : (process) => (e) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+e.INVOICE_id)()[0]
            return process.validate.distant(cbInvoice) ?
              CHARGEBEE_API().POST()(cbInvoice)('collect_payment') 
              : {id: e.INVOICE_id, step:'filter',  log:'Invalid for payment collection'} 
          },
        },
        apply_existing_credits: {
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_credit),
          uiLabel: int('invoice_apply_existing_credits'),
          params : [{INVOICE_id: ''}],
          condition: ( ) => true,
          funct  : (process) => (e) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+e.INVOICE_id)()[0]
            const cbCredit  = CHARGEBEE_API().GET()('credit_note')('id[is]='+e.CREDIT_id)()[0] 
            || {amount: CREDIT_amount, type: e.CREDIT_type,}
            
            return cbInvoice 
              && cbInvoice.amount_due > 0 
              && cbInvoice.amount_du >= cb.Credit.amount*100 
              ? CHARGEBEE_API().POST()(cbInvoice)('apply_credit') 
              : {id: elem.INVOICE_id, log:'Invalid for credit application'} 
          },
        },
        apply_new_credits: {
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_credit),
          uiLabel: int('invoice_apply_new_credits'),
          params : [{INVOICE_id: '',CREDIT_amount:''}], 
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            const cbCredit  = CHARGEBEE_API().GET()('credit_note')('id[is]='+elem.CREDIT_id)()[0] 
            || {amount: CREDIT_amount, type: elem.CREDIT_type,}
            
            return cbInvoice 
              && cbInvoice.amount_due > 0 
              && cbInvoice.amount_du >= cb.Credit.amount*100 
              ? CHARGEBEE_API().POST()(cbInvoice)('apply_credit') 
              : {id: elem.INVOICE_id, log:'Invalid for credit application'} 
          },
        },
      }
    },
    credit_note: {
      uiLabel: int('credit'),
      process : {
        create: {
          RUN: () => RUNTIME(RUNTREE(int).credit_note.process.create),
          uiLabel: int('credit_create'),
          params: [{CREDIT_id:'', CREDIT_amount:'', CREDIT_type:'',}], 
          funct: (process) => (elem) => { return true },
        }
      }
    }
  }
}  


function EN_txt (field) {
  const translation = {
    invoice: 'Invoice',
    invoice_collect: 'Collect Invoices',
    invoice_apply_credit: 'Apply credit on invoice',
    credit: 'Credit',
    credit_create: 'Create Credit',
  }
  return translation[field] || field
}