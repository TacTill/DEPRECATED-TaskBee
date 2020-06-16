function RUNTREE(int) {
    return { 
        invoice: { // https://apidocs.chargebee.com/docs/api/invoices
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
                    uiLabel: int('invoice retrieve_as_pdf'),
                    params : [{INVOICE_id: 'REQUIRED', DISPOSITION_type: 'inline'}],
                    validate : {
                        input   : (e) => e.INVOICE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', disposition_type: elem.DISPOSITION_type}

                        return cbInvoice 
                        ? CHARGEBEE_API().POST()(cbInvoice)('pdf').download
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
                        distant : (e) => true,
                        output  : (e) => true,
                    },          
                    funct  : (process) => (elem) => {

                        const cbCustomer = {customer_id: elem.CUSTOMER_id, object: 'invoices'}
                        const sai = elem.ADDON_id.toString() ? elem.ADDON_id.toString().split(';'): '';
                        const saq = elem.ADDON_quantity.toString() ? elem.ADDON_quantity.toString().split(';'): '';
                        const sca = elem.CHARGE_amount.toString() ? elem.CHARGE_amount.toString().split(';'): '';
                        const scd = elem.CHARGE_description.toString() ? elem.CHARGE_description.toString().split(';'): '';
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
                        : {id: elem.CUSTOMER_id, step:'runtree', log:'Invalid for invoice creation'} 
                    },
                },

                record_payment: {
                    RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_payment),
                    uiLabel: int('record_payment'),
                    params : [{INVOICE_id: 'REQUIRED', TRANSACTION_amount : '', TRANSACTION_payment_method: 'REQUIRED'}],
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

                // record_refund: { // transaction[date] : cannot be blank
                //     RUN    : () => RUNTIME(RUNTREE(int).invoice.process.record_refund),
                //     uiLabel: int('record_refund'),
                //     params : [{INVOICE_id: 'REQUIRED', TRANSACTION_amount: '', TRANSACTION_payment_method: ''}],
                //     validate : {
                //         input   : (e) => e.INVOICE_id,
                //         distant : (e) => e,
                //         output  : (e) => true,
                //     },
                //     funct  : (process) => (elem) => {
                //         const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', 
                //         'transaction[amount]' : elem.TRANSACTION_amount, 'transaction[payment_method]' : elem.TRANSACTION_payment_method}

                //         return cbInvoice 
                //         && cbInvoice.id.length > 0 
                //         ? CHARGEBEE_API().POST()(cbInvoice)('record_refund') 
                //         : {id: elem.INVOICE_id, log:'Invalid for invoice refund record'} 
                //     },
                // },

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
                        const cbInvoice = {id: elem.INVOICE_id, object: 'invoice', comment: elem.COMMENT, 
                        'billing_address[first_name]' : elem.BILLING_ADDRESS_first_name ,
                        'billing_address[last_name]'  : elem.BILLING_ADDRESS_last_name ,
                        'billing_address[email]'      : elem.BILLING_ADDRESS_email ,
                        'billing_address[company]'    : elem.BILLING_ADDRESS_company ,
                        'billing_address[phone]'      : elem.BILLING_ADDRESS_phone ,
                        'billing_address[line1]'      : elem.BILLING_ADDRESS_line1 ,
                        'billing_address[line2]'      : elem.BILLING_ADDRESS_line2 ,
                        'billing_address[line3]'      : elem.BILLING_ADDRESS_line3 ,
                        'billing_address[city]'       : elem.BILLING_ADDRESS_city ,

                        'shipping_address[first_name]' : elem.SHIPPING_ADDRESS_first_name ,
                        'shipping_address[last_name]'  : elem.SHIPPING_ADDRESS_last_name ,
                        'shipping_address[email]'      : elem.SHIPPING_ADDRESS_email ,
                        'shipping_address[company]'    : elem.SHIPPING_ADDRESS_company ,
                        'shipping_address[phone]'      : elem.SHIPPING_ADDRESS_phone ,
                        'shipping_address[line1]'      : elem.SHIPPING_ADDRESS_line1 ,
                        'shipping_address[line2]'      : elem.SHIPPING_ADDRESS_line2 ,
                        'shipping_address[line3]'      : elem.SHIPPING_ADDRESS_line3 ,
                        'shipping_address[city]'       : elem.SHIPPING_ADDRESS_city
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
                    params : [{INVOICE_id: 'REQUIRED', TRANSACTION_id: 'REQUIRED'}],
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
                    params : [{INVOICE_id: 'REQUIRED', CREDIT_note_id: 'REQUIRED'}],
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
                    params : [{INVOICE_id: 'REQUIRED', COMMENT: '', CREDIT_note_id: ''}],
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
        promotional_credits: { // https://apidocs.chargebee.com/docs/api/promotional_credits
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
                },
                deduct: { 
                    RUN      : () => RUNTIME(RUNTREE(int).promotional_credits.process.deduct),
                    uiLabel  : int('deduct_promotional_credits'),
                    params   : [{CUSTOMER_id: 'REQUIRED', AMOUNT: '1', DESCRIPTION : Session.getActiveUser().getEmail() + ': deducted a credit'}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {customer_id: elem.CUSTOMER_id, amount: (elem.AMOUNT*100).toString(), description: elem.DESCRIPTION, object: 'promotional_credits'}

                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/deduct') 
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for promotional_credits deduction'} 
                    }
                },
                setcredit: { 
                    RUN      : () => RUNTIME(RUNTREE(int).promotional_credits.process.setcredit),
                    uiLabel  : int('setcredit'),
                    params   : [{CUSTOMER_id: 'REQUIRED', AMOUNT: '1', DESCRIPTION : Session.getActiveUser().getEmail() + ': setted a credit'}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {customer_id: elem.CUSTOMER_id, amount: (elem.AMOUNT*100).toString(), description: elem.DESCRIPTION, object: 'promotional_credits'}

                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/set') 
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for promotional_credits set'} 
                    }
                },
            }
        },
        credit_notes: { // https://apidocs.chargebee.com/docs/api/credit_notes
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
                },

                retrieve_as_pdf: {  
                    RUN    : () => RUNTIME(RUNTREE(int).credit_notes.process.retrieve_as_pdf),
                    uiLabel: int('creditnote retrieve_as_pdf'),
                    params : [{CREDITNOTE_id: 'REQUIRED', DISPOSITION_type: 'inline'}],
                    validate : {
                        input   : (e) => e.CREDITNOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const cbInvoice = {id: elem.CREDITNOTE_id, object: 'credit_note', disposition_type: elem.DISPOSITION_type}

                        return cbInvoice 
                        ? CHARGEBEE_API().POST()(cbInvoice)('pdf').download
                        : {id: elem.CREDITNOTE_id, log:'Invalid for credit_notes retrieve as pdf'} 
                    },
                },

            }
        },
        hosted_pages: { // https://apidocs.chargebee.com/docs/api/hosted_pages
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
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/manage_payment_sources').hosted_page
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for hosted_pages manage_payment_sources'} 
                    }
                },

                checkout_new : {  // can only be called with one addon
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.checkout_new ),
                    uiLabel  : int('checkout_new hosted_pages'),
                    params   : [{BILLING_cycles: '', TERMS_to_charge: '', BILLING_alignment_mode: '', REDIRECT_url: '', CANCEL_url: '', PASS_thru_content: '',

                                'SUBSCRIPTION[id]' : '',
                                'SUBSCRIPTION[plan_id]' : 'REQUIRED',
                                'SUBSCRIPTION[plan_quantity]' : '',
                                'SUBSCRIPTION[plan_unit_price]' : '',
                                'SUBSCRIPTION[setup_fee]' : '',
                                'SUBSCRIPTION[auto_collection]' : '',
                                'SUBSCRIPTION[invoice_notes]' : '',
                                'SUBSCRIPTION[affiliate_token]' : '',
                                'SUBSCRIPTION[contract_term_billing_cycle_on_renewal]' : '',
                                'SUBSCRIPTION[cf_defaultsubscription]' : '',
                                'SUBSCRIPTION[cf_mainsubscription]' : '',
                                'SUBSCRIPTION[cf_extradevicessubscription]' : '',
                                
                                'CUSTOMER[id]' : '',
                                'CUSTOMER[email]' : '',
                                'CUSTOMER[first_name]' : '',
                                'CUSTOMER[last_name]' : '',
                                'CUSTOMER[company]' : '',
                                'CUSTOMER[taxability]' : '',
                                'CUSTOMER[locale]' : '',
                                'CUSTOMER[phone]' : '',
                                'CUSTOMER[vat_number]' : '',
                                'CUSTOMER[consolidated_invoicing]' : '',
                                'CUSTOMER[cf_seasonal]' : '',
                                
                                'CARD[gateway_account_id]' : '',
                                
                                'BILLING_address[first_name]' : '',
                                'BILLING_address[last_name]' : '',
                                'BILLING_address[email]' : '',
                                'BILLING_address[company]' : '',
                                'BILLING_address[phone]' : '',
                                'BILLING_address[line1]' : '',
                                'BILLING_address[line2]' : '',
                                'BILLING_address[line3]' : '',
                                'BILLING_address[city]' : '',
                                'BILLING_address[state_code]' : '',
                                'BILLING_address[state]' : '',
                                'BILLING_address[zip]' : '',
                                'BILLING_address[country]' : '',
                                'BILLING_address[validation_status]' : '',
                                
                                'SHIPPING_address[first_name]' : '',
                                'SHIPPING_address[last_name]' : '',
                                'SHIPPING_address[email]' : '',
                                'SHIPPING_address[company]' : '',
                                'SHIPPING_address[phone]' : '',
                                'SHIPPING_address[line1]' : '',
                                'SHIPPING_address[line2]' : '',
                                'SHIPPING_address[line3]' : '',
                                'SHIPPING_address[city]' : '',
                                'SHIPPING_address[state_code]' : '',
                                'SHIPPING_address[state]' : '',
                                'SHIPPING_address[zip]' : '',
                                'SHIPPING_address[country]' : '',
                                'SHIPPING_address[validation_status]' : '',
                                
                                'CONTRACT_term[action_at_term_end]' : '',
                                'CONTRACT_term[cancellation_cutoff_period]' : '',
                                
                                'ADDONS[id][0]' : '',
                                'ADDONS[quantity][0]' : '',
                                'ADDONS[unit_price][0]' : '',
                                'ADDONS[billing_cycles][0]' : ''}],
                    validate : {
                        input   : (e) => true,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {billing_cycles: elem.BILLING_cycles, terms_to_charge: elem.TERMS_to_charge, billing_alignment_mode: elem.BILLING_alignment_mode,
                        redirect_url: elem.REDIRECT_url, cancel_url: elem.CANCEL_url, pass_thru_content: elem.PASS_thru_content, object: 'hosted_pages',

                        'subscription[id]'                                     : elem['SUBSCRIPTION[id]'],
                        'subscription[plan_id]'                                : elem['SUBSCRIPTION[plan_id]'],
                        'subscription[plan_quantity]'                          : elem['SUBSCRIPTION[plan_quantity]'],
                        'subscription[plan_unit_price]'                        : elem['SUBSCRIPTION[plan_unit_price]'],
                        'subscription[setup_fee]'                              : elem['SUBSCRIPTION[setup_fee]'],
                        'subscription[auto_collection]'                        : elem['SUBSCRIPTION[auto_collection]'],
                        'subscription[invoice_notes]'                          : elem['SUBSCRIPTION[invoice_notes]'],
                        'subscription[affiliate_token]'                        : elem['SUBSCRIPTION[affiliate_token]'],
                        'subscription[contract_term_billing_cycle_on_renewal]' : elem['SUBSCRIPTION[contract_term_billing_cycle_on_renewal]'],
                        'subscription[cf_defaultsubscription]'                 : elem['SUBSCRIPTION[cf_defaultsubscription]'],
                        'subscription[cf_mainsubscription]'                    : elem['SUBSCRIPTION[cf_mainsubscription]'],
                        'subscription[cf_extradevicessubscription]'            : elem['SUBSCRIPTION[cf_extradevicessubscription]'],
                        
                        'customer[id]'                     : elem['CUSTOMER[id]'].toString(),
                        'customer[email]'                  : elem['CUSTOMER[email]'].toString(),
                        'customer[first_name]'             : elem['CUSTOMER[first_name]'].toString(),
                        'customer[last_name]'              : elem['CUSTOMER[last_name]'].toString(),
                        'customer[company]'                : elem['CUSTOMER[company]'].toString(),
                        'customer[taxability]'             : elem['CUSTOMER[taxability]'].toString(),
                        'customer[locale]'                 : elem['CUSTOMER[locale]'].toString(),
                        'customer[phone]'                  : elem['CUSTOMER[phone]'].toString(),
                        'customer[vat_number]'             : elem['CUSTOMER[vat_number]'].toString(),
                        'customer[consolidated_invoicing]' : elem['CUSTOMER[consolidated_invoicing]'].toString(),
                        'customer[cf_seasonal]'            : elem['CUSTOMER[cf_seasonal]'].toString(),
                        
                        'card[gateway_account_id]' : elem['CARD[gateway_account_id]'],
                        
                        'billing_address[first_name]'        : elem['BILLING_address[first_name]'],
                        'billing_address[last_name]'         : elem['BILLING_address[last_name]'],
                        'billing_address[email]'             : elem['BILLING_address[email]'],
                        'billing_address[company]'           : elem['BILLING_address[company]'],
                        'billing_address[phone]'             : elem['BILLING_address[phone]'],
                        'billing_address[line1]'             : elem['BILLING_address[line1]'],
                        'billing_address[line2]'             : elem['BILLING_address[line2]'],
                        'billing_address[line3]'             : elem['BILLING_address[line3]'],
                        'billing_address[city]'              : elem['BILLING_address[city]'],
                        'billing_address[state_code]'        : elem['BILLING_address[state_code]'],
                        'billing_address[state]'             : elem['BILLING_address[state]'],
                        'billing_address[zip]'               : elem['BILLING_address[zip]'],
                        'billing_address[country]'           : elem['BILLING_address[country]'],
                        'billing_address[validation_status]' : elem['BILLING_address[validation_status]'],                                
                        
                        'shipping_address[first_name]'        : elem['SHIPPING_address[first_name]'],
                        'shipping_address[last_name]'         : elem['SHIPPING_address[last_name]'],
                        'shipping_address[email]'             : elem['SHIPPING_address[email]'],
                        'shipping_address[company]'           : elem['SHIPPING_address[company]'],
                        'shipping_address[phone]'             : elem['SHIPPING_address[phone]'],
                        'shipping_address[line1]'             : elem['SHIPPING_address[line1]'],
                        'shipping_address[line2]'             : elem['SHIPPING_address[line2]'],
                        'shipping_address[line3]'             : elem['SHIPPING_address[line3]'],
                        'shipping_address[city]'              : elem['SHIPPING_address[city]'],
                        'shipping_address[state_code]'        : elem['SHIPPING_address[state_code]'],
                        'shipping_address[state]'             : elem['SHIPPING_address[state]'],
                        'shipping_address[zip]'               : elem['SHIPPING_address[zip]'],
                        'shipping_address[country]'           : elem['SHIPPING_address[country]'],
                        'shipping_address[validation_status]' : elem['SHIPPING_address[validation_status]'],
                        
                        'contract_term[action_at_term_end]'         : elem['CONTRACT_term[action_at_term_end]'],
                        'contract_term[cancellation_cutoff_period]' : elem['CONTRACT_term[cancellation_cutoff_period]'],
                        
                        'addons[id][0]'             : elem['ADDONS[id][0]'],
                        'addons[quantity][0]'       : elem['ADDONS[quantity][0]'],
                        'addons[unit_price][0]'     : elem['ADDONS[unit_price][0]'],
                        'addons[billing_cycles][0]' : elem['ADDONS[billing_cycles][0]']}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/checkout_new').hosted_page
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for hosted_pages checkout_new'} 
                    }
                },
                checkout_existing : {   // can only be called with one addon
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.checkout_existing ),
                    uiLabel  : int('checkout_existing hosted_pages'),
                    params   : [{REPLACE_addon_list: '', BILLING_cycles: '', TERMS_to_charge: '', BILLING_alignment_mode: '',
                    REACTIVATE: '', FORCE_term_reset: '', REDIRECT_url: '', CANCEL_url: '', PASS_thru_content: '',

                    'SUBSCRIPTION[id]' : 'REQUIRED',
                    'SUBSCRIPTION[plan_id]' : '',
                    'SUBSCRIPTION[plan_quantity]' : '',
                    'SUBSCRIPTION[plan_unit_price]' : '',
                    'SUBSCRIPTION[setup_fee]' : '',
                    'SUBSCRIPTION[invoice_notes]' : '',
                    'SUBSCRIPTION[contract_term_billing_cycle_on_renewal]' : '',
                    'SUBSCRIPTION[cf_defaultsubscription]' : '',
                    
                    'CUSTOMER[vat_number]' : '',
                    
                    'CARD[gateway_account_id]' : '',
                    
                    'CONTRACT_term[action_at_term_end]' : '',
                    'CONTRACT_term[cancellation_cutoff_period]' : '',
                    
                    'ADDONS[id][0]' : '',
                    'ADDONS[quantity][0]' : '',
                    'ADDONS[unit_price][0]' : '',
                    'ADDONS[billing_cycles][0]' : ''}],
                    validate : {
                        input   : (e) => e['SUBSCRIPTION[id]'],
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {replace_addon_list : elem.REPLACE_addon_list, billing_cycles : elem.BILLING_cycles,
                            terms_to_charge : elem.TERMS_to_charge, billing_alignment_mode : elem.BILLING_alignment_mode,
                            reactivate : elem.REACTIVATE, force_term_reset : elem.FORCE_term_reset,
                            redirect_url : elem.REDIRECT_url, cancel_url : elem.CANCEL_url,
                            pass_thru_content : elem.PASS_thru_content,

                            'subscription[id]'                                     : elem['SUBSCRIPTION[id]'],
                            'subscription[plan_id]'                                : elem['SUBSCRIPTION[plan_id]'],
                            'subscription[plan_quantity]'                          : elem['SUBSCRIPTION[plan_quantity]'],
                            'subscription[plan_unit_price]'                        : elem['SUBSCRIPTION[plan_unit_price]'],
                            'subscription[setup_fee]'                              : elem['SUBSCRIPTION[setup_fee]'],
                            'subscription[invoice_notes]'                          : elem['SUBSCRIPTION[invoice_notes]'],
                            'subscription[contract_term_billing_cycle_on_renewal]' : elem['SUBSCRIPTION[contract_term_billing_cycle_on_renewal]'],
                            'subscription[cf_defaultsubscription]'                 : elem['SUBSCRIPTION[cf_defaultsubscription]'],

                            'customer[vat_number]' : elem['CUSTOMER[vat_number]'],
        
                            'card[gateway_account_id]' : elem['CARD[gateway_account_id]'],
        
                            'contract_term[action_at_term_end]'         : elem['CONTRACT_term[action_at_term_end]'],
                            'contract_term[cancellation_cutoff_period]' : elem['CONTRACT_term[cancellation_cutoff_period]'],
        
                            'addons[id][0]'             : elem['ADDONS[id][0]'],
                            'addons[quantity][0]'       : elem['ADDONS[quantity][0]'],
                            'addons[unit_price][0]'     : elem['ADDONS[unit_price][0]'],
                            'addons[billing_cycles][0]' : elem['ADDONS[billing_cycles][0]']}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/checkout_existing').hosted_page
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for hosted_pages checkout_existing'} 
                    }
                },
                collect_now : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.collect_now),
                    uiLabel  : int('collect_now hosted_pages'),
                    params   : [{CUSTOMER_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {'customer[id]':elem.CUSTOMER_id, object: 'hosted_pages'}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/collect_now').hosted_page
                        : {id: elem.CUSTOMER_id, step:'filter', log:'Invalid for hosted_pages collect_now'} 
                    }
                },
                accept_quote : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.accept_quote),
                    uiLabel  : int('accept_quote hosted_pages'),
                    params   : [{QUOTE_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {'quote[id]':elem.QUOTE_id, object: 'hosted_pages'}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/accept_quote').hosted_page
                        : {id: elem.QUOTE_id, step:'filter', log:'Invalid for hosted_pages accept_quote'} 
                    }
                },
                extend_subscription : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.extend_subscription),
                    uiLabel  : int('extend_subscription hosted_pages'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', BILLING_cycles: '', EXPIRY: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {'subscription[id]':elem.SUBSCRIPTION_id, object: 'hosted_pages',
                        expiry: elem.EXPIRY, billing_cycles: elem.BILLING_cycles}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/extend_subscription').hosted_page
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for hosted_pages extend_subscription'} 
                    }
                },
                checkout_gift : {  // can only be called with one addon
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.checkout_gift),
                    uiLabel  : int('checkout_gift hosted_pages'),
                    params   : [{REDIRECT_url: '',

                        'GIFTER[customer_id]' : '',
                        'GIFTER[locale]' : '',
                        
                        'SUBSCRIPTION[plan_id]' : 'REQUIRED',
                        'SUBSCRIPTION[plan_quantity]' : '',
                        'SUBSCRIPTION[coupon]' : '',
                        'SUBSCRIPTION[cf_defaultsubscription]' : '',
                        'SUBSCRIPTION[cf_mainsubscription]' : '',
                        'SUBSCRIPTION[cf_extradevicessubscription]' : '',
                        
                        'ADDONS[id][0]' : '',
                        'ADDONS[quantity][0]' : ''}],
                    validate : {
                        input   : (e) => true,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {redirect_url: elem.REDIRECT_url, object: 'hosted_pages',

                        'gifter[customer_id]' : elem['GIFTER[customer_id]'],
                        'gifter[locale]' : elem['GIFTER[locale]'],
                        
                        'subscription[plan_id]' : elem['SUBSCRIPTION[plan_id]'],
                        'subscription[plan_quantity]' : elem['SUBSCRIPTION[plan_quantity]'],
                        'subscription[coupon]' : elem['SUBSCRIPTION[coupon]'],
                        'subscription[cf_defaultsubscription]' : elem['SUBSCRIPTION[cf_defaultsubscription]'],
                        'subscription[cf_mainsubscription]' : elem['SUBSCRIPTION[cf_mainsubscription]'],
                        'subscription[cf_extradevicessubscription]' : elem['SUBSCRIPTION[cf_extradevicessubscription]'],
                        
                        'addons[id][0]' : elem['ADDONS[id][0]'],
                        'addons[quantity][0]' : elem['ADDONS[quantity][0]'],

                    }
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/checkout_gift').hosted_page
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for hosted_pages checkout_gift'} 
                    }
                }, 
                claim_gift : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.claim_gift),
                    uiLabel  : int('claim_gift hosted_pages'),
                    params   : [{REDIRECT_url: '',

                        'GIFT[id]' : 'REQUIRED',
                        'CUSTOMER[locale]' : ''}],
                    validate : {
                        input   : (e) => true,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {redirect_url: elem.REDIRECT_url, object: 'hosted_pages',

                        'gift[id]' : elem['GIFT[id]'],
                        'customer[locale]' : elem['CUSTOMER[locale]']}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/claim_gift').hosted_page
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for hosted_pages claim_gift'} 
                    }
                },
                retrieve_agreement_pdf : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.retrieve_agreement_pdf),
                    uiLabel  : int('retrieve_agreement_pdf hosted_pages'),
                    params   : [{PAYMENT_source_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.PAYMENT_source_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {payment_source_id: elem.PAYMENT_source_id, object: 'hosted_pages'}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)('/retrieve_agreement_pdf').hosted_page
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for hosted_pages retrieve_agreement_pdf'} 
                    }
                },
                acknowledge : { 
                    RUN      : () => RUNTIME(RUNTREE(int).hosted_pages.process.acknowledge),
                    uiLabel  : int('acknowledge hosted_pages'),
                    params   : [{HOSTED_page_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.HOSTED_page_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'hosted_page', id: elem.HOSTED_page_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)('acknowledge').hosted_page
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for hosted_pages acknowledge'} 
                    }
                },
            }
        },
        subscription: { // https://apidocs.chargebee.com/docs/api/subscriptions
            uiLabel: int('subscription'),
            process : {

                update : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.update),
                    uiLabel  : int('update subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', NEW_plan: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id, 
                        plan_id: elem.NEW_plan}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)()
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription update'} 
                    }
                },

                create : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.create),
                    uiLabel  : int('create subscription'),
                    params   : [{PLAN_id: 'REQUIRED', SUBSCRIPTION_id: '', CUSTOMER_id: '', CUSTOMER_email: '',
                    PLAN_quantity: '', PLAN_unit_price: '', SETUP_fee: '', TRIAL_end: '', BILLING_cycles: '', AUTO_collection: '' }],
                    validate : {
                        input   : (e) => e.PLAN_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscriptions', plan_id: elem.PLAN_id, subscription_id: elem.SUBSCRIPTION_id,
                        'customer[id]': elem.CUSTOMER_id, 'customer[email]': elem.CUSTOMER_email,
                        plan_quantity: elem.PLAN_quantity, plan_unit_price: elem.PLAN_unit_price,
                        setup_fee: elem.SETUP_fee, trial_end: elem.TRIAL_end,
                        billing_cycles: elem.BILLING_cycles, auto_collection: elem.AUTO_collection  }
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)()
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription create'} 
                    }
                },

                create_on_client : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.create_on_client),
                    uiLabel  : int('create_on_client subscription'),
                    params   : [{PLAN_id: 'REQUIRED', SUBSCRIPTION_id: '', CUSTOMER_id: 'REQUIRED', PLAN_quantity: '',
                    PLAN_unit_price: '', SETUP_fee: '', TRIAL_end: '', BILLING_cycles: '', AUTO_collection: '' }],
                    validate : {
                        input   : (e) => e.PLAN_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'customer', id: elem.CUSTOMER_id, plan_id: elem.PLAN_id,
                        subscription_id: elem.SUBSCRIPTION_id, plan_quantity: elem.PLAN_quantity,
                        plan_unit_price: elem.PLAN_unit_price, setup_fee: elem.SETUP_fee, trial_end: elem.TRIAL_end,
                        billing_cycles: elem.BILLING_cycles, auto_collection: elem.AUTO_collection  }
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("subscriptions")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription create_on_client'} 
                    }
                },

                remove_scheduled_changes : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.remove_scheduled_changes),
                    uiLabel  : int('remove_scheduled_changes subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("remove_scheduled_changes")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription remove_scheduled_changes'} 
                    }
                },

                remove_scheduled_cancellation : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.remove_scheduled_cancellation),
                    uiLabel  : int('remove_scheduled_cancellation subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', BILLING_cycles: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id, billing_cycles: elem.BILLING_cycles}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("remove_scheduled_cancellation")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription remove_scheduled_cancellation'} 
                    }
                },

                remove_coupons : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.remove_coupons),
                    uiLabel  : int('remove_coupons subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("remove_coupons")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription remove_coupons'} 
                    }
                },

                reactivate : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.reactivate),
                    uiLabel  : int('reactivate subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("reactivate")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription reactivate'} 
                    }
                },

                add_charge_at_term_end : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.add_charge_at_term_end),
                    uiLabel  : int('add_charge_at_term_end subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', AMOUNT: 'REQUIRED',
                    DESCRIPTION: Session.getActiveUser().getEmail() + ' add_charge_at_term_end'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        amount: (elem.AMOUNT*100).toString(), description: elem.DESCRIPTION}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("add_charge_at_term_end")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription add_charge_at_term_end'} 
                    }
                },

                charge_addon_at_term_end : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.charge_addon_at_term_end),
                    uiLabel  : int('charge_addon_at_term_end subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', 
                    ADDON_id: 'REQUIRED', ADDON_quantity: '', ADDON_unit_price: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        addon_id: elem.ADDON_id, addon_quantity: elem.ADDON_quantity.toString(), addon_unit_price: elem.ADDON_unit_price}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("charge_addon_at_term_end")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription charge_addon_at_term_end'} 
                    }
                },

                charge_future_renewals : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.charge_future_renewals),
                    uiLabel  : int('charge_future_renewals subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("charge_future_renewals")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription charge_future_renewals'} 
                    }
                },

                override_billing_profile : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.override_billing_profile),
                    uiLabel  : int('override_billing_profile subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED', PAYMENT_source_id: '', AUTO_collection: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        payment_source_id: elem.PAYMENT_source_id, auto_collection: elem.AUTO_collection}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("override_billing_profile")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription override_billing_profile'} 
                    }
                },

                del : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.del),
                    uiLabel  : int('del subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("delete")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription del'} 
                    }
                },

                pause : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.pause),
                    uiLabel  : int('pause subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED',
                    PAUSE_option: '', UNBILLED_charges_handling: '', INVOICE_dunning_handling: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        pause_option: elem.PAUSE_option, unbilled_charges_handling: elem.UNBILLED_charges_handling, invoice_dunning_handling: elem.INVOICE_dunning_handling, }
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("pause")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription pause'} 
                    }
                },

                cancel : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.cancel),
                    uiLabel  : int('cancel subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED',
                    END_of_term: '', CANCEL_at: '', CREDIT_option_for_current_term_charges: '',
                    UNBILLED_charges_option: '', ACCOUNT_receivables_handling: '', REFUNDABLE_credits_handling: '',
                    CONTRACT_term_cancel_option: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        end_of_term: elem.END_of_term, cancel_at: elem.CANCEL_at,
                        credit_option_for_current_term_charges: elem.CREDIT_option_for_current_term_charges,
                        unbilled_charges_option: elem.UNBILLED_charges_option,
                        account_receivables_handling: elem.ACCOUNT_receivables_handling,
                        refundable_credits_handling: elem.REFUNDABLE_credits_handling,
                        contract_term_cancel_option: elem.CONTRACT_term_cancel_option}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("cancel")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription cancel'} 
                    }
                },

                resume : { 
                    RUN      : () => RUNTIME(RUNTREE(int).subscription.process.resume),
                    uiLabel  : int('resume subscription'),
                    params   : [{SUBSCRIPTION_id: 'REQUIRED',
                    RESUME_option: '', CHARGES_handling: '', UNPAID_invoices_handling: ''}],
                    validate : {
                        input   : (e) => e.SUBSCRIPTION_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'subscription', id: elem.SUBSCRIPTION_id,
                        resume_option: elem.RESUME_option, charges_handling: elem.CHARGES_handling, unpaid_invoices_handling: elem.UNPAID_invoices_handling}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("resume")
                        : {id: elem.SUBSCRIPTION_id, step:'filter', log:'Invalid for subscription resume'} 
                    }
                },               
            },

        },
        pdf_url: { // custom
            uiLabel: int('pdf_url'),
            process : {

                download : { 
                    RUN      : () => RUNTIME(RUNTREE(int).pdf_url.process.download),
                    uiLabel  : int('download pdf_url'),
                    params   : [{PDF_url: '', DIRECTORY_id: '', FILENAME: ''}],
                    validate : {
                        input   : (e) => e.PDF_url && e.DIRECTORY_id && e.FILENAME,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {fileURL: elem.PDF_url, fileNAME: elem.FILENAME, Directory: elem.DIRECTORY_id}
                        return callObj 
                        ? downloadFile(callObj.fileURL, callObj.fileNAME, callObj.Directory)
                        : {id: elem.pdf_url, step:'filter', log:'Invalid for pdf_url download'} 
                    }
                }
            }
        },
        quotes: { // https://apidocs.chargebee.com/docs/api/quotes
            uiLabel: int('quotes'),
            process : {

                create_subscription_quote : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.create_subscription_quote),
                    uiLabel  : int('create_subscription_quote quotes'),
                    params   : [{CUSTOMER_id: 'REQUIRED', NAME: '', SUBSCRIPTION_plan_id: 'REQUIRED', NOTES: '',
                    BILLING_cycles: '', TERMS_to_charge: '', BILLING_alignment_mode: ''}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {id: elem.CUSTOMER_id, object: 'customer',
                        name: elem.NAME, notes: elem.NOTES, expires_at: elem.EXPIRES_at,
                        billing_cycles: elem.BILLING_cycles, terms_to_charge: elem.TERMS_to_charge, billing_alignment_mode: elem.BILLING_alignment_mode,
                        'subscription[plan_id]': elem.SUBSCRIPTION_plan_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("create_subscription_quote")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes create_subscription_quote'} 
                    }
                },

                edit_create_subscription_quote : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.edit_create_subscription_quote),
                    uiLabel  : int('edit_create_subscription_quote quotes'),
                    params   : [{QUOTE_id: 'REQUIRED', NOTES: '', SUBSCRIPTION_plan_id: 'REQUIRED',
                    BILLING_cycles: '', TERMS_to_charge: '', BILLING_alignment_mode: ''}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {id: elem.QUOTE_id, object: 'quote',
                        notes: elem.NOTES, billing_cycles: elem.BILLING_cycles,
                        terms_to_charge: elem.TERMS_to_charge, billing_alignment_mode: elem.BILLING_alignment_mode,
                        'subscription[plan_id]': elem.SUBSCRIPTION_plan_id}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("edit_create_subscription_quote")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes edit_create_subscription_quote'} 
                    }
                },

                update_subscription_quote : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.update_subscription_quote),
                    uiLabel  : int('update_subscription_quote quotes'),
                    params   : [{NAME: '', NOTES: '', REPLACE_addon_list: '', BILLING_cycles: '', TERMS_to_charge: '',
                    REACTIVATE_from: '', BILLING_alignment_mode: '', REPLACE_coupon_list: '', FORCE_term_reset: '', REACTIVATE: '',

                    'SUBSCRIPTION[id]' : 'REQUIRED',
                    'SUBSCRIPTION[plan_id]' : '',
                    'SUBSCRIPTION[plan_quantity]' : '',
                    'SUBSCRIPTION[plan_unit_price]' : '',
                    'SUBSCRIPTION[setup_fee]' : '',
                    'SUBSCRIPTION[start_date]' : '',
                    'SUBSCRIPTION[trial_end]' : '',
                    'SUBSCRIPTION[contract_term_billing_cycle_on_renewal]' : '',

                    'BILLING_address[first_name]' : '',
                    'BILLING_address[last_name]' : '',
                    'BILLING_address[email]' : '',
                    'BILLING_address[company]' : '',
                    'BILLING_address[phone]' : '',
                    'BILLING_address[line1]' : '',
                    'BILLING_address[line2]' : '',
                    'BILLING_address[line3]' : '',
                    'BILLING_address[city]' : '',
                    'BILLING_address[state_code]' : '',
                    'BILLING_address[state]' : '',
                    'BILLING_address[zip]' : '',
                    'BILLING_address[country]' : '',
                    'BILLING_address[validation_status]' : '',

                    'SHIPPING_address[first_name]' : '',
                    'SHIPPING_address[last_name]' : '',
                    'SHIPPING_address[email]' : '',
                    'SHIPPING_address[company]' : '',
                    'SHIPPING_address[phone]' : '',
                    'SHIPPING_address[line1]' : '',
                    'SHIPPING_address[line2]' : '',
                    'SHIPPING_address[line3]' : '',
                    'SHIPPING_address[city]' : '',
                    'SHIPPING_address[state_code]' : '',
                    'SHIPPING_address[state]' : '',
                    'SHIPPING_address[zip]' : '',
                    'SHIPPING_address[country]' : '',
                    'SHIPPING_address[validation_status]' : '',

                    'CUSTOMER[vat_number]' : '',
                    'CUSTOMER[registered_for_gst]' : '',

                    'CONTRACT_term[action_at_term_end]' : '',
                    'CONTRACT_term[cancellation_cutoff_period]' : ''}],
                    validate : {
                        input   : (e) => true,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'quotes',
                        name                    : elem.NAME,
                        notes                   : elem.NOTES,
                        replace_addon_list      : elem.REPLACE_addon_list,
                        billing_cycles          : elem.BILLING_cycles,
                        terms_to_charge         : elem.TERMS_to_charge,
                        reactivate_from         : elem.REACTIVATE_from,
                        billing_alignment_mode  : elem.BILLING_alignment_mode,
                        replace_coupon_list     : elem.REPLACE_coupon_list,
                        force_term_reset        : elem.FORCE_term_reset,
                        reactivate              : elem.REACTIVATE,

                        'subscription[id]'                                     : elem['SUBSCRIPTION[id]'],
                        'subscription[plan_id]'                                : elem['SUBSCRIPTION[plan_id]'],
                        'subscription[plan_quantity]'                          : elem['SUBSCRIPTION[plan_quantity]'],
                        'subscription[plan_unit_price]'                        : elem['SUBSCRIPTION[plan_unit_price]'],
                        'subscription[setup_fee]'                              : elem['SUBSCRIPTION[setup_fee]'],
                        'subscription[start_date]'                             : elem['SUBSCRIPTION[start_date]'],
                        'subscription[trial_end]'                              : elem['SUBSCRIPTION[trial_end]'],
                        'subscription[contract_term_billing_cycle_on_renewal]' : elem['SUBSCRIPTION[contract_term_billing_cycle_on_renewal]'],

                        'billing_address[first_name]'        : elem['BILLING_address[first_name]'],
                        'billing_address[last_name]'         : elem['BILLING_address[last_name]'],
                        'billing_address[email]'             : elem['BILLING_address[email]'],
                        'billing_address[company]'           : elem['BILLING_address[company]'],
                        'billing_address[phone]'             : elem['BILLING_address[phone]'],
                        'billing_address[line1]'             : elem['BILLING_address[line1]'],
                        'billing_address[line2]'             : elem['BILLING_address[line2]'],
                        'billing_address[line3]'             : elem['BILLING_address[line3]'],
                        'billing_address[city]'              : elem['BILLING_address[city]'],
                        'billing_address[state_code]'        : elem['BILLING_address[state_code]'],
                        'billing_address[state]'             : elem['BILLING_address[state]'],
                        'billing_address[zip]'               : elem['BILLING_address[zip]'],
                        'billing_address[country]'           : elem['BILLING_address[country]'],
                        'billing_address[validation_status]' : elem['BILLING_address[validation_status]'],

                        'shipping_address[first_name]'        : elem['SHIPPING_address[first_name]'],
                        'shipping_address[last_name]'         : elem['SHIPPING_address[last_name]'],
                        'shipping_address[email]'             : elem['SHIPPING_address[email]'],
                        'shipping_address[company]'           : elem['SHIPPING_address[company]'],
                        'shipping_address[phone]'             : elem['SHIPPING_address[phone]'],
                        'shipping_address[line1]'             : elem['SHIPPING_address[line1]'],
                        'shipping_address[line2]'             : elem['SHIPPING_address[line2]'],
                        'shipping_address[line3]'             : elem['SHIPPING_address[line3]'],
                        'shipping_address[city]'              : elem['SHIPPING_address[city]'],
                        'shipping_address[state_code]'        : elem['SHIPPING_address[state_code]'],
                        'shipping_address[state]'             : elem['SHIPPING_address[state]'],
                        'shipping_address[zip]'               : elem['SHIPPING_address[zip]'],
                        'shipping_address[country]'           : elem['SHIPPING_address[country]'],
                        'shipping_address[validation_status]' : elem['SHIPPING_address[validation_status]'],

                        'customer[vat_number]'                      : elem['CUSTOMER[vat_number]'],
                        'customer[registered_for_gst]'              : elem['CUSTOMER[registered_for_gst]'],
                        'contract_term[action_at_term_end]'         : elem['CONTRACT_term[action_at_term_end]'],
                        'contract_term[cancellation_cutoff_period]' : elem['CONTRACT_term[cancellation_cutoff_period]']}
                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)("/update_subscription_quote")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes update_subscription_quote'} 
                    }
                },
                
                create_for_onetime_charges : { // only one charge or addon supported
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.create_for_onetime_charges),
                    uiLabel  : int('create_for_onetime_charges quotes'),
                    params   : [{NAME: '', CUSTOMER_id: 'REQUIRED', PO_number:'', NOTES: '', COUPON: '',

                    'SHIPPING_address[first_name]' : '',
                    'SHIPPING_address[last_name]' : '',
                    'SHIPPING_address[email]' : '',
                    'SHIPPING_address[company]' : '',
                    'SHIPPING_address[phone]' : '',
                    'SHIPPING_address[line1]' : '',
                    'SHIPPING_address[line2]' : '',
                    'SHIPPING_address[line3]' : '',
                    'SHIPPING_address[city]' : '',
                    'SHIPPING_address[state_code]' : '',
                    'SHIPPING_address[state]' : '',
                    'SHIPPING_address[zip]' : '',
                    'SHIPPING_address[country]' : '',
                    'SHIPPING_address[validation_status]' : '',

                    'ADDONS[id][0]' : '',
                    'ADDONS[quantity][0]' : '',
                    'ADDONS[unit_price][0]' : '',
                    'ADDONS[service_period][0]' : '',

                    'CHARGES[amount][0]' : '',
                    'CHARGES[description][0]' : '',
                    'CHARGES[avalara_sale_type][0]' : '',
                    'CHARGES[avalara_transaction_type][0]' : '',
                    'CHARGES[avalara_service_type][0]' : '',
                    'CHARGES[service_period][0]' : ''}],
                    validate : {
                        input   : (e) => e.CUSTOMER_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct  : (process) => (elem) => {
                        const callObj = {object: 'quotes',

                        name        : elem.NAME,
                        customer_id : elem.CUSTOMER_id,
                        po_number   : elem.PO_number,
                        notes       : elem.NOTES,
                        coupon      : elem.COUPON,

                        'shipping_address[first_name]'        : elem['SHIPPING_address[first_name]'],
                        'shipping_address[last_name]'         : elem['SHIPPING_address[last_name]'],
                        'shipping_address[email]'             : elem['SHIPPING_address[email]'],
                        'shipping_address[company]'           : elem['SHIPPING_address[company]'],
                        'shipping_address[phone]'             : elem['SHIPPING_address[phone]'],
                        'shipping_address[line1]'             : elem['SHIPPING_address[line1]'],
                        'shipping_address[line2]'             : elem['SHIPPING_address[line2]'],
                        'shipping_address[line3]'             : elem['SHIPPING_address[line3]'],
                        'shipping_address[city]'              : elem['SHIPPING_address[city]'],
                        'shipping_address[state_code]'        : elem['SHIPPING_address[state_code]'],
                        'shipping_address[state]'             : elem['SHIPPING_address[state]'],
                        'shipping_address[zip]'               : elem['SHIPPING_address[zip]'],
                        'shipping_address[country]'           : elem['SHIPPING_address[country]'],
                        'shipping_address[validation_status]' : elem['SHIPPING_address[validation_status]'],

                        'addons[id][0]'             : elem['ADDONS[id][0]'],
                        'addons[quantity][0]'       : elem['ADDONS[quantity][0]'],
                        'addons[unit_price][0]'     : elem['ADDONS[unit_price][0]'],
                        'addons[service_period][0]' : elem['ADDONS[service_period][0]'],

                        'charges[amount][0]'                   : (elem['CHARGES[amount][0]']*100).toString(),
                        'charges[description][0]'              : elem['CHARGES[description][0]'],
                        'charges[avalara_sale_type][0]'        : elem['CHARGES[avalara_sale_type][0]'],
                        'charges[avalara_transaction_type][0]' : elem['CHARGES[avalara_transaction_type][0]'],
                        'charges[avalara_service_type][0]'     : elem['CHARGES[avalara_service_type][0]'],
                        'charges[service_period][0]'           : elem['CHARGES[service_period][0]']}

                        return callObj 
                        ? CHARGEBEE_API().POST_NO_TARGET()(callObj)("/create_for_onetime_charges")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes create_for_onetime_charges'} 
                    }
                },

                convert : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.convert),
                    uiLabel  : int('convert quotes'),
                    params   : [{QUOTE_id : 'REQUIRED',
                        'SUBSCRIPTION[id]' : '',
                        'SUBSCRIPTION[auto_collection]' : '',
                        'SUBSCRIPTION[po_number]' : ''}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct : (process) => (elem) => {
                        const callObj = {id: elem.QUOTE_id, object: 'quote',

                        'subscription[id]'              : elem['SUBSCRIPTION[id]'],
                        'subscription[auto_collection]' : elem['SUBSCRIPTION[auto_collection]'],
                        'subscription[po_number]'       : elem['SUBSCRIPTION[po_number]']}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("convert")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes convert'} 
                    }
                },

                update_status : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.update_status),
                    uiLabel  : int('update_status quotes'),
                    params   : [{QUOTE_id: 'REQUIRED', STATUS: 'REQUIRED', COMMENT: ''}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct : (process) => (elem) => {
                        const callObj = {id: elem.QUOTE_id, object: 'quote', status: elem.STATUS, comment: elem.COMMENT}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("update_status")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes update_status'} 
                    }
                },

                del : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.del),
                    uiLabel  : int('del quotes'),
                    params   : [{QUOTE_id: 'REQUIRED', COMMENT: ''}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct : (process) => (elem) => {
                        const callObj = {id: elem.QUOTE_id, object: 'quote', comment: elem.COMMENT}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("delete")
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes del'} 
                    }
                },

                retrieve_as_pdf : { 
                    RUN      : () => RUNTIME(RUNTREE(int).quotes.process.retrieve_as_pdf),
                    uiLabel  : int('retrieve_as_pdf quotes'),
                    params   : [{QUOTE_id: 'REQUIRED'}],
                    validate : {
                        input   : (e) => e.QUOTE_id,
                        distant : (e) => true,
                        output  : (e) => true,
                    },
                    funct : (process) => (elem) => {
                        const callObj = {id: elem.QUOTE_id, object: 'quote'}
                        return callObj 
                        ? CHARGEBEE_API().POST()(callObj)("pdf").download
                        : {id: elem.quotes, step:'filter', log:'Invalid for quotes retrieve_as_pdf'} 
                    }
                },
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

function downloadFile(fileURL, fileNAME, Directory) {
    const blob = UrlFetchApp.fetch(fileURL).getBlob(); 
    const file = {
        title: fileNAME,
        mimeType: blob.getContentType(),
        parents: [{id: Directory}]
    };

    Drive.Files.insert(file, blob);
    return { result: fileNAME + " created !"};
}