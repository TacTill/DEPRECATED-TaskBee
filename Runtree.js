
function RUNTREE(int) {
    return { 
        invoice: {
            uiLabel: int('invoice'),
            process : {

                apply_payment: { 
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_payment),
                    uiLabel: int('apply_payment'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                collect: { 
                    RUN      : () => RUNTIME(RUNTREE(int).invoice.process.collect),
                    uiLabel  : int('invoice_collect'),
                    params   : [{INVOICE_id: 'REQUIRED'}],
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

                retrieve_as_pdf: {  
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.retrieve_as_pdf),
                    uiLabel: int('retrieve_as_pdf'),
                    params : [{INVOICE_id: 'REQUIRED', DISPOSITION_type: 'inline'}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', disposition_type: elem.DISPOSITION_type}

                        return cbInvoice 
                        ? CHARGEBEE_API().POST()(cbInvoice)('pdf') 
                        : {id: elem.INVOICE_id, log:'Invalid for invoice retrieve as pdf'} 
                    },
                },

                refund: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.refund),
                    uiLabel: int('refund'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                stop_dunning: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.stop_dunning),
                    uiLabel: int('stop_dunning'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                void: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.void),
                    uiLabel: int('void'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                write_off: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.write_off),
                    uiLabel: int('write_off'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                del: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.del),
                    uiLabel: int('del'),
                    params : [{INVOICE_id: 'REQUIRED'}],
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

                create_invoice: { // split items by a ';' so you can have more than one
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice),
                    uiLabel: int('invoice_create_new'),
                    params : [{CUSTOMER_id: 'REQUIRED', 
                    ADDON_id: '', ADDON_quantity: '', CHARGE_amount: '', CHARGE_description: ''}], 
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },          
                    funct  : (process) => (elem) => {

                        const cbCustomer = {customer_id: elem.CUSTOMER_id, object: 'invoices'}
                        sai = elem.ADDON_id ? elem.ADDON_id.split(';'): '';
                        saq = elem.ADDON_quantity ? elem.ADDON_quantity.split(';'): '';
                        sca = elem.CHARGE_amount ? elem.CHARGE_amount.split(';'): '';
                        scd = elem.CHARGE_description ? elem.CHARGE_description.split(';'): '';
                        for (var i = 0; i < sai.length && i < saq.length; i++) {
                            cbCustomer['addons[id]['+i+']'] = sai[i];
                            cbCustomer['addons[quantity]['+i+']'] = saq[i];
                        }
                        for (var i = 0; i < sca.length && i < scd.length; i++) {
                            cbCustomer['charges[amount]['+i+']'] = sca[i];
                            cbCustomer['charges[description]['+i+']'] = scd[i];
                        }

                        return cbCustomer 
                        ? CHARGEBEE_API().POST_NO_TARGET()(cbCustomer)() 
                        : {id: elem.CUSTOMER_id, log:'Invalid for invoice creation'} 
                    },
                },

                record_payment: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_payment),
                    uiLabel: int('record_payment'),
                    params : [{INVOICE_id: 'REQUIRED', TRANSACTION_amount : '', TRANSACTION_payment_method: ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', 
                        'transaction[amount]' : elem.TRANSACTION_amount, 'transaction[payment_method]' : elem.TRANSACTION_payment_method}

                        return cbInvoice 
                        && cbInvoice.id.length > 0 
                        ? CHARGEBEE_API().POST()(cbInvoice)('record_payment') 
                        : {id: elem.INVOICE_id, log:'Invalid for payment recording'} 
                    },
                },

                record_refund: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_refund),
                    uiLabel: int('record_refund'),
                    params : [{INVOICE_id: 'REQUIRED', TRANSACTION_amount: '', TRANSACTION_payment_method: ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: INVOICE_id, object: 'invoice', 
                        'transaction[amount]' : elem.TRANSACTION_amount, 'transaction[payment_method]' : elem.TRANSACTION_payment_method}

                        return cbInvoice 
                        && cbInvoice.id.length > 0 
                        ? CHARGEBEE_API().POST()(cbInvoice)('record_refund') 
                        : {id: elem.INVOICE_id, log:'Invalid for invoice refund record'} 
                    },
                },

                update_details: { 
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.update_details),
                    uiLabel: int('update_details'),
                    params : [{INVOICE_id: 'REQUIRED', COMMENT: '',
                    BILLING_ADDRESS_first_name : '', BILLING_ADDRESS_last_name : '',
                    BILLING_ADDRESS_email : '', BILLING_ADDRESS_company : '', BILLING_ADDRESS_phone : '', 
                    BILLING_ADDRESS_line1 : '', BILLING_ADDRESS_line2 : '', BILLING_ADDRESS_line3 : '',
                    BILLING_ADDRESS_city : '',
                    SHIPPING_ADDRESS_first_name : '', SHIPPING_ADDRESS_last_name : '',
                    SHIPPING_ADDRESS_email : '', SHIPPING_ADDRESS_company : '', SHIPPING_ADDRESS_phone : '', 
                    SHIPPING_ADDRESS_line1 : '', SHIPPING_ADDRESS_line2 : '', SHIPPING_ADDRESS_line3 : '',
                    SHIPPING_ADDRESS_city : ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: INVOICE_id, object: 'invoice', comment: elem.COMMENT, 
                        'billing_address[first_name]' : elem.BILLING_ADDRESS_first_name ,
                        'billing_address[last_name]' : elem.BILLING_ADDRESS_last_name ,
                        'billing_address[email]' : elem.BILLING_ADDRESS_email ,
                        'billing_address[company]' : elem.BILLING_ADDRESS_company ,
                        'billing_address[phone]' : elem.BILLING_ADDRESS_phone ,
                        'billing_address[line1]' : elem.BILLING_ADDRESS_line1 ,
                        'billing_address[line2]' : elem.BILLING_ADDRESS_line2 ,
                        'billing_address[line3]' : elem.BILLING_ADDRESS_line3 ,
                        'billing_address[city]' : elem.BILLING_ADDRESS_city ,
                        'shipping_address[first_name]' : elem.SHIPPING_ADDRESS_first_name ,
                        'shipping_address[last_name]' : elem.SHIPPING_ADDRESS_last_name ,
                        'shipping_address[email]' : elem.SHIPPING_ADDRESS_email ,
                        'shipping_address[company]' : elem.SHIPPING_ADDRESS_company ,
                        'shipping_address[phone]' : elem.SHIPPING_ADDRESS_phone ,
                        'shipping_address[line1]' : elem.SHIPPING_ADDRESS_line1 ,
                        'shipping_address[line2]' : elem.SHIPPING_ADDRESS_line2 ,
                        'shipping_address[line3]' : elem.SHIPPING_ADDRESS_line3 ,
                        'shipping_address[city]' : elem.SHIPPING_ADDRESS_city
                    }

                        return cbInvoice 
                        && cbInvoice.id.length > 0 
                        ? CHARGEBEE_API().POST()(cbInvoice)('update_details') 
                        : {id: elem.INVOICE_id, log:'Invalid for invoice update_details'} 
                    },
                },

                remove_payment: { 
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.remove_payment),
                    uiLabel: int('remove_payment'),
                    params : [{INVOICE_id: 'REQUIRED', TRANSACTION_id: ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice',
                        'transaction[id]': elem.TRANSACTION_id}

                        return cbInvoice 
                        && cbInvoice.id.length > 0 
                        ? CHARGEBEE_API().POST()(cbInvoice)('remove_payment') 
                        : {id: elem.INVOICE_id, log:'Invalid for invoice payment removal'} 
                    },
                },

                remove_credit_note: { 
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.remove_credit_note),
                    uiLabel: int('remove_credit_note'),
                    params : [{INVOICE_id: 'REQUIRED', CREDIT_note_id: ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', 'credit_note[id]': elem.CREDIT_note_id}

                        return cbInvoice 
                        && cbInvoice.id.length > 0 
                        ? CHARGEBEE_API().POST()(cbInvoice)('remove_credit_note') 
                        : {id: elem.INVOICE_id, log:'Invalid for invoice credit_note removal'} 
                    },
                },

                apply_credits: { 
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.apply_credits),
                    uiLabel: int('invoice_apply_credits'),
                    params : [{INVOICE_id: '', COMMENT: '', CREDIT_note_id: ''}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => e,
                        output  : (e) => true,
                    }, 
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', 
                        comment: elem.COMMENT, 'credit_notes[id][0]': elem.CREDIT_note_id}

                        return cbInvoice 
                        ? CHARGEBEE_API().POST()(cbInvoice)('apply_credits') 
                        : {id: elem.INVOICE_id, log:'Invalid for credit application'} 
                    },
                },

            }
        },
        promotional_credits: {
            uiLabel: int('promotional_credits'),
            process : {

                add: { 
                    RUN      : () => RUNTIME(RUNTREE(int).promotional_credits.process.add),
                    uiLabel  : int('add_promotional_credits'),
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
        },
        credit_notes: {
            uiLabel: int('credit_notes'),
            process : {

                create: { 
                    RUN      : () => RUNTIME(RUNTREE(int).credit_notes.process.create),
                    uiLabel  : int('credit_notes create'),
                    params   : [{REFERENCE_invoice_id: 'REQUIRED', TOTAL:'', TYPE: '', REASON_code: '', CUSTOMER_notes:'',COMMENT:''}],
                    validate : {
                        input   : (e) => e.REFERENCE_invoice_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'credit_notes', 
                        reference_invoice_id : elem.REFERENCE_invoice_id, total: (elem.TOTAL*100).toString(), type : elem.TYPE, reason_code : elem.REASON_code, customer_notes: elem.CUSTOMER_notes, comment:elem.COMMENT}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('') 
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for credit_notes creation'} 
                    }
                }

            }
        },
        hosted_pages: {
            uiLabel: int('hosted_pages'),
            process : {

                manage_payment_sources : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.manage_payment_sources ),
                    uiLabel  : int('manage_payment_sources hosted_pages'),
                    params   : [{CUSTOMER_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {'customer[id]':elem.CUSTOMER_id, object: 'hosted_pages'}
                        return callObj 
                        ? {id: elem.CUSTOMER_id, url:CHARGEBEE_API().POST_NO_TARGET()(callObj)('/manage_payment_sources').hosted_page.url}
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for hosted_pages manage_payment_sources'} 
                    }
                }

            }
        }
    }
}


// INVOICE

//         import_invoice: {  //This API is not enabled for live sites by default. Please contact support@chargebee.com to get this enabled.
//             RUN    : () => RUNTIME(RUNTREE(int).invoice.process.import_invoice),
//             uiLabel: int('import_invoice'),
//             params : [{INVOICE_id: '', CUSTOMER_id: '', TOTAL: '', SUBSCRIPTION_id: ''}],
//             validate : {
//                 input   : (e) => e.INVOICE_id,
//                 distant : (e) => e,
//                 output  : (e) => true,
//             },
//             funct  : (process) => (elem) => {
//                 const cbInvoice = {id: elem.INVOICE_id, object: 'invoices'}

//                 return cbInvoice 
//                 && cbInvoice.id.length > 0 
//                 ? CHARGEBEE_API().POST_NO_TARGET()(cbInvoice)('/import_invoice') 
//                 : {id: elem.INVOICE_id, log:'Invalid for invoice importation'} 
//             },
//         },

//         create_invoice_charge: { // deprec, better use create invoice
//             RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice_charge),
//             uiLabel: int('invoice_create_new_charge'),
//             params : [{CUSTOMER_id: '', SUBSCRIPTION_id: '', CHARGE_amount: '', CHARGE_description ''}], 
//             validate : {
//                 input   : (e) => e.INVOICE_id,
//                 distant : (e) => e,
//                 output  : (e) => true,
//             },
//             funct  : (process) => (elem) => {
//                 const cbCustomerOrSub = CHARGEBEE_API().GET()('customer')('id[is]='+elem.CUSTOMER_id)()[0]
//                 || CHARGEBEE_API().GET()('subscription')('id[is]='+elem.SUBSCRIPTION_id)()[0]
//             || {customer_id: elem.CUSTOMER_id, amount: CHARGE_amount, description: CHARGE_description/*, object:'invoices/charge'*/}
//         || {subscription_id: elem.SUBSCRIPTION_id, amount: CHARGE_amount, description: CHARGE_description/*, object:'invoices/charge'*/} 

//         return cbCustomerOrSub 
//         && cbCustomerOrSub.id.length > 0 
//         ? CHARGEBEE_API().POST()(cbCustomerOrSub)() // invoices/charge? 
//         : {id: elem.INVOICE_id, log:'Invalid for invoice charge creation'} 
//     },
// },


//         create_invoice_charge_addon: { // deprec, better use create invoice
//             RUN    : () => RUNTIME(RUNTREE(int).invoice.process.create_invoice_charge_addon),
//             uiLabel: int('invoice_create_new_addon'),
//             params : [{CUSTOMER_id: '', SUBSCRIPTION_id: '', ADDON_id: ''}], 
//             funct  : (process) => (elem) => {
//                 const cbCustomerOrSub = CHARGEBEE_API().GET()('customer')('id[is]='+elem.CUSTOMER_id)()[0]
//                 || CHARGEBEE_API().GET()('subscription')('id[is]='+elem.SUBSCRIPTION_id)()[0]
//             || {customer_id: elem.CUSTOMER_id, addon_id: ADDON_id /*, object:'invoices/charge_addon'*/}
//         || {subscription_id: elem.SUBSCRIPTION_id, addon_id: ADDON_id /*, object:'invoices/charge_addon'*/} 

//         return cbCustomerOrSub 
//         && cbCustomerOrSub.id.length > 0 
//         ? CHARGEBEE_API().POST()(cbCustomerOrSub)() // invoices/charge_addon? 
//         : {id: elem.INVOICE_id, log:'Invalid for invoice addon creation'} 
//     },
// },

// add_charge_to_pending: {  /*Invoice in Pending state is only supported to add line item or Collect Invoice*/
//     RUN    : () => RUNTIME(RUNTREE(int).invoice.process.add_charge_to_pending),
//     uiLabel: int('add_charge_to_pending'),
//     params : [{INVOICE_id: 'required', CHARGE_amount: 'required', CHARGE_description: 'required'}],
//     validate : {
//         input   : (e) => e.INVOICE_id,
//         distant : (e) => e,
//         output  : (e) => true,
//     },
//     funct  : (process) => (elem) => {
//         const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
//         || {id: INVOICE_id, object: 'invoice', amount: CHARGE_amount, description: CHARGE_description}

//         return cbInvoice 
//         && cbInvoice.id.length > 0 
//         ? CHARGEBEE_API().POST()(cbInvoice)('add_charge') 
//         : {id: elem.INVOICE_id, log:'Invalid for charge adding'} 
//     },
// },

// add_addon_to_pending: { // pending prob
//     RUN    : () => RUNTIME(RUNTREE(int).invoice.process.add_addon_to_pending),
//     uiLabel: int('add_addon_to_pending'),
//     params : [{INVOICE_id: ''}],
//     funct  : (process) => (elem) => {
//         const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
//         || {addon_id: INVOICE_id, id: INVOICE_id, object: 'invoice'}

//         return cbInvoice 
//         && cbInvoice.id.length > 0 
//         ? CHARGEBEE_API().POST()(cbInvoice)('add_addon_charge') 
//         : {id: elem.INVOICE_id, log:'Invalid for addon adding'} 
//     },
// },

// close_pending: { // pending prob
//     RUN    : () => RUNTIME(RUNTREE(int).invoice.process.close_pending),
//     uiLabel: int('close_pending'),
//     params : [{INVOICE_id: ''}],
//     funct  : (process) => (elem) => {
//         const cbInvoice = CHARGEBEE_API().GET()('invoice')('id[is]='+elem.INVOICE_id)()[0]
//         || {id: INVOICE_id, object: 'invoice'}

//         return cbInvoice 
//         && cbInvoice.id.length > 0 
//         ? CHARGEBEE_API().POST()(cbInvoice)('close') 
//         : {id: elem.INVOICE_id, log:'Invalid for pending closing'} 
//     },
// },


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