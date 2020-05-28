
function RUNTREE(int) {
  return { 
    invoice: {
      uiLabel: int('invoice'),
      process : {
        collect: { // marche
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
        // apply_existing_credits: { // retour non error but nothing happens
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_credit),
        //   uiLabel: int('invoice_apply_existing_credits'),
        //   params : [{INVOICE_id: ''}],
        //     validate : {
        //     input   : (e) => e.INVOICE_id,
        //     distant : (e) => e,
        //     output  : (e) => true,
        //   },
        //   condition: ( ) => true,
        //   funct  : (process) => (e) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+e.INVOICE_id)()[0]
        //     const cbCredit  = CHARGEBEE_API().GET()('credit_note')('id[is]='+e.CREDIT_id)()[0] 
        //     || {amount: CREDIT_amount, type: e.CREDIT_type,}

        //     return cbInvoice 
        //     && cbInvoice.amount_due > 0 
        //     && cbInvoice.amount_du >= cb.Credit.amount*100 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('apply_credit') 
        //     : {id: elem.INVOICE_id, log:'Invalid for credit application'} 
        //   },
        // },
        // apply_new_credits: { // retour non error but nothing happens
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_credit),
        //   uiLabel: int('invoice_apply_new_credits'),
        //   params : [{INVOICE_id: '',CREDIT_amount:''}], 
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     const cbCredit  = CHARGEBEE_API().GET()('credit_note')('id[is]='+elem.CREDIT_id)()[0] 
        //     // pourquoi ce call est fait 2 fois ^
        //     || {amount: CREDIT_amount, type: elem.CREDIT_type,}

        //     return cbInvoice 
        //     && cbInvoice.amount_due > 0 
        //     && cbInvoice.amount_du >= cb.Credit.amount*100 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('apply_credit') 
        //     : {id: elem.INVOICE_id, log:'Invalid for credit application'} 
        //   },
        // },

        stop_dunning_for_invoice: { /*marche awee*/
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.stop_dunning_for_invoice),
          uiLabel: int('stop_dunning_for_invoice'),
          params : [{INVOICE_id: 'required'}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e && e.amount_due > 0,
            output  : (e) => true,
          },
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice 
            && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('stop_dunning') 
            : {id: elem.INVOICE_id, step:'filter', log:'Invalid for invoice dunning stop'} 
          },
        },

        apply_payment: { /* marcheeeee */
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_payment),
          uiLabel: int('apply_payment'),
          params : [{INVOICE_id: 'required'}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e,
            output  : (e) => true,
          },
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice 
            && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('apply_payments') 
            : {id: elem.INVOICE_id, step:'filter',log:'Invalid for invoice payment applyance'} 
          },
        },

        retrieve_as_pdf: {  
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.retrieve_as_pdf),
          uiLabel: int('retrieve_as_pdf'),
          params : [{INVOICE_id: 'required', DISPOSITION_type: 'inline'}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => true,
            output  : (e) => true,
          },
          funct  : (process) => (elem) => {
            const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', disposition_type: elem.DISPOSITION_type,  step:'jesaipa'}

            return cbInvoice 
            ? CHARGEBEE_API().POST()(cbInvoice)('pdf') 
            : {id: elem.INVOICE_id, step:'jesaipa' , log:'Invalid for invoice retrieve as pdf'} 
          },
        },

        // add_charge_to_pending: {  /*Invoice in Pending state is only supported to add line item or Collect Invoice*/
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.add_charge_to_pending),
        //   uiLabel: int('add_charge_to_pending'),
        //   params : [{INVOICE_id: 'required', CHARGE_amount: 'required', CHARGE_description: 'required'}],
        //   validate : {
        //     input   : (e) => e.INVOICE_id,
        //     distant : (e) => e,
        //     output  : (e) => true,
        //   },
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice', amount: CHARGE_amount, description: CHARGE_description}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('add_charge') 
        //     : {id: elem.INVOICE_id, log:'Invalid for charge adding'} 
        //   },
        // },

        // add_addon_to_pending: { // pending prob
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.add_addon_to_pending),
        //   uiLabel: int('add_addon_to_pending'),
        //   params : [{INVOICE_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {addon_id: INVOICE_id, id: INVOICE_id, object: 'invoice'}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('add_addon_charge') 
        //     : {id: elem.INVOICE_id, log:'Invalid for addon adding'} 
        //   },
        // },

        // close_pending: { // pending prob
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.close_pending),
        //   uiLabel: int('close_pending'),
        //   params : [{INVOICE_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice'}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('close') 
        //     : {id: elem.INVOICE_id, log:'Invalid for pending closing'} 
        //   },
        // },

        // record_payment: {  /*transaction[payment_method] : cannot be blank*/
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_payment),
        //   uiLabel: int('record_payment'),
        //   params : [{INVOICE_id: 'required', TRANSACTION_type: 'cash'}],
        //     validate : {
        //     input   : (e) => e.INVOICE_id,
        //     distant : (e) => e,
        //     output  : (e) => true,
        //   },
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', 'transaction[payment_method]' : elem.TRANSACTION_type}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('record_payment') 
        //     : {id: elem.INVOICE_id, log:'Invalid for payment recording'} 
        //   },
        // },

        refund: { /*marche */
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.refund),
          uiLabel: int('refund'),
          params : [{INVOICE_id: 'required'}],
            validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e,
            output  : (e) => true,
          },
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice 
            && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('refund') 
            : {id: elem.INVOICE_id, step:'filter', log:'Invalid for invoice refund'} 
          },
        },


        // record_refund: { // transaction[payment_method] : cannot be blank
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_refund),
        //   uiLabel: int('record_refund'),
        //   params : [{INVOICE_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice'}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('record_refund') 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice refund record'} 
        //   },
        // },

        // remove_payment: { // transaction[id] : cannot be blank
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.remove_payment),
        //   uiLabel: int('remove_payment'),
        //   params : [{INVOICE_id: '', TRANSACTION_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice', transaction.id: TRANSACTION_id}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('remove_payment') 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice payment removal'} 
        //   },
        // },


        // remove_credit_note: { // credit_note[id] : cannot be blank
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.remove_credit_note),
        //   uiLabel: int('remove_credit_note'),
        //   params : [{INVOICE_id: '', CREDIT_note_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice', credit_note[id]: CREDIT_note_id}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('remove_credit_note') 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice credit_note removal'} 
        //   },
        // },


        void: { //marche
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.void),
          uiLabel: int('void'),
          params : [{INVOICE_id: ''}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e,
            output  : (e) => true,
          },
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('void') 
            : {id: elem.INVOICE_id, step:'filter', log:'Invalid for invoice void'} 
          },
        },

        write_off: { //marche
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.write_off),
          uiLabel: int('write_off'),
          params : [{INVOICE_id: ''}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e,
            output  : (e) => true,
          },        
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice 
            && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('write_off') 
            : {id: elem.INVOICE_id, step:'filter', log:'Invalid for invoice write off'} 
          },
        },

        del: { // marche et supprime uniquement les !PAID
          RUN    : () => RUNTIME(RUNTREE(int).invoice.process.del),
          uiLabel: int('del'),
          params : [{INVOICE_id: ''}],
          validate : {
            input   : (e) => e.INVOICE_id,
            distant : (e) => e,
            output  : (e) => true,
          },          
          funct  : (process) => (elem) => {
            const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
            || {id: INVOICE_id, object: 'invoice'}

            return cbInvoice 
            && cbInvoice.id.length > 0 
            ? CHARGEBEE_API().POST()(cbInvoice)('delete') 
            : {id: elem.INVOICE_id,step:'filter', log:'Invalid for invoice deletion'} 
          },
        },
        // create_invoice: {  //'Atleast one non recurring addon or charge item should be present'
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice),
        //   uiLabel: int('invoice_create_new'),
        //   params : [{CUSTOMER_id: 'REQUIRED', }], 
        //   validate : {
        //     input   : (e) => e.CUSTOMER_id,
        //     distant : (e) => e,
        //     output  : (e) => true,
        //   },          
        //   funct  : (process) => (elem) => {
        //     const cbCustomer = {customer_id: elem.CUSTOMER_id, object: 'invoices'}

        //     return cbCustomer 
        //     ? CHARGEBEE_API().POST_NO_TARGET()(cbCustomer)() 
        //     : {id: elem.CUSTOMER_id, log:'Invalid for invoice creation'} 
        //   },
        // },

    }
        // update: { // override 
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.update),
        //   uiLabel: int('update'),
        //   params : [{INVOICE_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id, object: 'invoice'}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)('update_details') 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice update'} 
        //   },
        // },

/////////////////////////////

    

        // import_invoice: {
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.import_invoice),
        //   uiLabel: int('import_invoice'),
        //   params : [{INVOICE_id: ''}],
        //   funct  : (process) => (elem) => {
        //     const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
        //     || {id: INVOICE_id/*, object: 'invoices/import_invoice'*/}

        //     return cbInvoice 
        //     && cbInvoice.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbInvoice)() 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice importation'} 
        //   },
        // },



        // create_invoice_charge: {
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice_charge),
        //   uiLabel: int('invoice_create_new_charge'),
        //   params : [{CUSTOMER_id: '', SUBSCRIPTION_id: '', CHARGE_amount: '', CHARGE_description ''}], 
        //   funct  : (process) => (elem) => {
        //     const cbCustomerOrSub = CHARGEBEE_API().GET()('customer')('id[is]='+elem.CUSTOMER_id)()[0]
        //     || CHARGEBEE_API().GET()('subscription')('id[is]='+elem.SUBSCRIPTION_id)()[0]
        //     || {customer_id: elem.CUSTOMER_id, amount: CHARGE_amount, description: CHARGE_description/*, object:'invoices/charge'*/}
        //     || {subscription_id: elem.SUBSCRIPTION_id, amount: CHARGE_amount, description: CHARGE_description/*, object:'invoices/charge'*/} 

        //     return cbCustomerOrSub 
        //     && cbCustomerOrSub.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbCustomerOrSub)() // invoices/charge? 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice charge creation'} 
        //   },
        // },


        // create_invoice_charge_addon: {
        //   RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice_charge_addon),
        //   uiLabel: int('invoice_create_new_addon'),
        //   params : [{CUSTOMER_id: '', SUBSCRIPTION_id: '', ADDON_id: ''}], 
        //   funct  : (process) => (elem) => {
        //     const cbCustomerOrSub = CHARGEBEE_API().GET()('customer')('id[is]='+elem.CUSTOMER_id)()[0]
        //     || CHARGEBEE_API().GET()('subscription')('id[is]='+elem.SUBSCRIPTION_id)()[0]
        //     || {customer_id: elem.CUSTOMER_id, addon_id: ADDON_id /*, object:'invoices/charge_addon'*/}
        //     || {subscription_id: elem.SUBSCRIPTION_id, addon_id: ADDON_id /*, object:'invoices/charge_addon'*/} 

        //     return cbCustomerOrSub 
        //     && cbCustomerOrSub.id.length > 0 
        //     ? CHARGEBEE_API().POST()(cbCustomerOrSub)() // invoices/charge_addon? 
        //     : {id: elem.INVOICE_id, log:'Invalid for invoice addon creation'} 
        //   },
        // },




          
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
        },
        promotional_credits: {
            uiLabel: int('promotional_credits'),
            process : {
                add: { // marche
                    RUN      : () => RUNTIME(RUNTREE(int).promotional_credits.process.add),
                    uiLabel  : int('promotional_credits'),
                    params   : [{CUSTOMER_id: 'REQUIRED', AMOUNT: "1", DESCRIPTION: Session.getActiveUser().getEmail() + ': added a credit'}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {customer_id: elem.CUSTOMER_id, amount: (elem.AMOUNT*100).toString(), description: elem.DESCRIPTION, object: 'promotional_credits'}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/add') 
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for promotional_credits addition'} 
                    }
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