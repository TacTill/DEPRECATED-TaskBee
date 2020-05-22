function API_CONFIG() {
  return {
    getChargebeeConfig: CHARGEBEE_API_CONFIG
  } 
}

function CHARGEBEE_API_CONFIG () { 
return {
  "endpoint": [
    {
      "name": "addon",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "invoice_name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "pricing_model",
          "type": "enum"
        },
        {
          "name": "charge_type",
          "type": "enum"
        },
        {
          "name": "price",
          "type": "in_cents"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "period",
          "type": "integer"
        },
        {
          "name": "period_unit",
          "type": "enum"
        },
        {
          "name": "unit",
          "type": "string"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "archived_at",
          "type": "timestamp"
        },
        {
          "name": "enabled_in_portal",
          "type": "boolean"
        },
        {
          "name": "tax_code",
          "type": "string"
        },
        {
          "name": "taxjar_product_code",
          "type": "string"
        },
        {
          "name": "avalara_sale_type",
          "type": "enum"
        },
        {
          "name": "avalara_transaction_type",
          "type": "integer"
        },
        {
          "name": "avalara_service_type",
          "type": "integer"
        },
        {
          "name": "sku",
          "type": "string"
        },
        {
          "name": "accounting_code",
          "type": "string"
        },
        {
          "name": "accounting_category1",
          "type": "string"
        },
        {
          "name": "accounting_category2",
          "type": "string"
        },
        {
          "name": "is_shippable",
          "type": "boolean"
        },
        {
          "name": "shipping_frequency_period",
          "type": "integer"
        },
        {
          "name": "shipping_frequency_period_unit",
          "type": "enum"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "invoices_notes",
          "type": "string"
        },
        {
          "name": "taxable",
          "type": "boolean"
        },
        {
          "name": "tax_profile_id",
          "type": "string"
        },
        {
          "name": "meta_data",
          "type": "object"
        },
        {
          "name": "tiers",
          "type": "list"
        }
      ],
      "list": {
        "general_params": [],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "name",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "pricing_model",
            "type": "enum",
            "possible_values": [
              "flat_fee",
              "per_unit",
              "tiered",
              "volume",
              "stairstep"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "charge_type",
            "type": "enum",
            "possible_values": ["recurring", "non_recurring"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "price",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "period",
            "type": "integer",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "period_unit",
            "type": "enum",
            "possible_values": [
              "day",
              "week",
              "month",
              "year",
              "not_applicable"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": ["active", "archived"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "credit_note",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "customer_id",
          "type": "string"
        },
        {
          "name": "subscription_id",
          "type": "string"
        },
        {
          "name": "reference_invoice_id",
          "type": "string"
        },
        {
          "name": "type",
          "type": "enum"
        },
        {
          "name": "reason_code",
          "type": "enum"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "vat_number",
          "type": "string"
        },
        {
          "name": "date",
          "type": "timestamp"
        },
        {
          "name": "price_type",
          "type": "enum"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "total",
          "type": "in_cents"
        },
        {
          "name": "amount_allocated",
          "type": "in_cents"
        },
        {
          "name": "amount_refunded",
          "type": "in_cents"
        },
        {
          "name": "amount_available",
          "type": "in_cents"
        },
        {
          "name": "refunded_at",
          "type": "timestamp"
        },
        {
          "name": "voided_at",
          "type": "timestamp"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "sub_total",
          "type": "in_cents"
        },
        {
          "name": "sub_total_in_local_currency",
          "type": "in_cents"
        },
        {
          "name": "total_in_local_currency",
          "type": "in_cents"
        },
        {
          "name": "local_currency_code",
          "type": "string"
        },
        {
          "name": "round_off_amount",
          "type": "in_cents"
        },
        {
          "name": "fractional_correction",
          "type": "in_cents"
        },
        {
          "name": "deleted",
          "type": "boolean"
        },
        {
          "name": "line_items",
          "type": "list"
        },
        {
          "name": "discounts",
          "type": "list"
        },
        {
          "name": "line_item_discounts",
          "type": "list"
        },
        {
          "name": "line_item_tiers",
          "type": "list"
        },
        {
          "name": "taxes",
          "type": "list"
        },
        {
          "name": "line_item_taxes",
          "type": "list"
        },
        {
          "name": "linked_refunds",
          "type": "list"
        },
        {
          "name": "allocations",
          "type": "list"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "include_deleted",
            "type": "boolean"
          },
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["date"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "customer_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "subscription_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "reference_invoice_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "type",
            "type": "enum",
            "operators": ["is", "is_not"],
            "possible_values": ["adjustment", "refundable"]
          },
          {
            "name": "reason_code",
            "type": "enum",
            "operators": ["is", "is_not"],
            "possible_values": [
              "write_off",
              "subscribtion_change",
              "subscribtion_cancellation",
              "subscribtion_pause",
              "chargeback",
              "product_unsatisfactory",
              "service_unsatisfactory",
              "order_change",
              "order_cancellation",
              "waiver",
              "other",
              "fraudulent"
            ]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": ["adjusted", "refunded", "redung_due", "voided"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "date",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "total",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "price_type",
            "type": "enum",
            "operators": ["is", "is_not"],
            "possible_values": ["tax_exclusive", "tax_inclusive"]
          },
          {
            "name": "amount_allocated",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "amount_refunded",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "amount_available",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "voided_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "customer",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "first_name",
          "type": "string"
        },
        {
          "name": "last_name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "phone",
          "type": "string"
        },
        {
          "name": "company",
          "type": "string"
        },
        {
          "name": "vat_number",
          "type": "string"
        },
        {
          "name": "auto_collection",
          "type": "enum"
        },
        {
          "name": "net_term_days",
          "type": "integer"
        },
        {
          "name": "vat_number_validated_time",
          "type": "timestamp"
        },
        {
          "name": "vat_number_status",
          "type": "enum"
        },
        {
          "name": "allow_direct_debit",
          "type": "boolean"
        },
        {
          "name": "is_location_valid",
          "type": "boolean"
        },
        {
          "name": "created_at",
          "type": "timestamp"
        },
        {
          "name": "created_from_ip",
          "type": "string"
        },
        {
          "name": "exemption_details",
          "type": "object"
        },
        {
          "name": "taxability",
          "type": "enum"
        },
        {
          "name": "exempt_number",
          "type": "string"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "locale",
          "type": "string"
        },
        {
          "name": "consolidated_invoicing",
          "type": "boolean"
        },
        {
          "name": "billing_date",
          "type": "integer"
        },
        {
          "name": "billing_date_mode",
          "type": "enum"
        },
        {
          "name": "billing_day_of_week",
          "type": "enum"
        },
        {
          "name": "billing_day_of_week_mode",
          "type": "enum"
        },
        {
          "name": "pii_cleared",
          "type": "enum"
        },
        {
          "name": "fraud_flag",
          "type": "enum"
        },
        {
          "name": "primary_payment_source_id",
          "type": "string"
        },
        {
          "name": "backup_payment_source_id",
          "type": "string"
        },
        {
          "name": "ivoice_notes",
          "type": "string"
        },
        {
          "name": "preferred_currency_code",
          "type": "string"
        },
        {
          "name": "promotional_credits",
          "type": "in_cents"
        },
        {
          "name": "unbilled_charges",
          "type": "in_cents"
        },
        {
          "name": "refundable_credits",
          "type": "in_cents"
        },
        {
          "name": "excess_payments",
          "type": "in_cents"
        },
        {
          "name": "meta_data",
          "type": "object"
        },
        {
          "name": "deleted",
          "type": "boolean"
        },
        {
          "name": "business_customer_without_vat_number",
          "type": "boolean"
        },
        {
          "name": "customer_type",
          "type": "enum"
        },
        {
          "name": "client_profile_id",
          "type": "string"
        },
        {
          "name": "billing_address",
          "type": "object"
        },
        {
          "name": "referral_urls",
          "type": "list"
        },
        {
          "name": "contacts",
          "type": "list"
        },
        {
          "name": "payment_method",
          "type": "object"
        },
        {
          "name": "balances",
          "type": "list"
        },
        {
          "name": "relationship",
          "type": "object"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "include_deleted",
            "type": "boolean",
            "default": "false"
          },
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["created_at", "updated_at"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "first_name",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "last_name",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "email",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "company",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "phone",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "auto_collection",
            "type": "enum",
            "possible_values": ["on", "off"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "taxability",
            "type": "enum",
            "possible_values": ["taxable", "exempt"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "created_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "event",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "occurred_at",
          "type": "timestamp"
        },
        {
          "name": "source",
          "type": "enum"
        },
        {
          "name": "user",
          "type": "string"
        },
        {
          "name": "event_type",
          "type": "enum"
        },
        {
          "name": "api_version",
          "type": "enum"
        },
        {
          "name": "content",
          "type": "object"
        },
        {
          "name": "webhooks",
          "type": "list"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["occurred_at"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "webhook_status",
            "type": "enum",
            "possible_values": [
              "not_configured",
              "scheduled",
              "succeeded",
              "re_scheduled",
              "failed",
              "skipped",
              "not_applicable"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "event_type",
            "type": "enum",
            "possible_values": [
              "plan_created",
              "plan_updated",
              "plan_deleted",
              "addon_created",
              "addon_updated",
              "addon_deleted",
              "coupon_created",
              "coupon_updated",
              "coupon_deleted",
              "coupon_set_created",
              "coupon_set_updated",
              "coupon_set_deleted",
              "coupon_codes_added",
              "coupon_codes_deleted",
              "coupon_codes_updated",
              "customer_created",
              "customer_changed",
              "customer_deleted",
              "customer_moved_out",
              "customer_moved_in",
              "promotional_credits_added",
              "promotional_credits_deducted",
              "subscription_created",
              "subscription_started",
              "subscription_trial_end_reminder",
              "subscription_activated",
              "subscription_changed",
              "subscription_cancellation_scheduled",
              "subscription_cancellation_reminder",
              "subscription_cancelled",
              "subscription_reactivated",
              "subscription_renewed",
              "subscription_scheduled_cancellation_removed",
              "subscription_changes_scheduled",
              "subscription_scheduled_changes_removed",
              "subscription_shipping_address_updated",
              "subscription_deleted",
              "subscription_paused",
              "subscription_pause_scheduled",
              "subscription_scheduled_pause_removed",
              "subscription_resumed",
              "subscription_resumption_scheduled",
              "subscription_scheduled_resumption_removed",
              "pending_invoice_created",
              "pending_invoice_updated",
              "invoice_generated",
              "invoice_updated",
              "invoice_deleted",
              "credit_note_created",
              "credit_note_updated",
              "credit_note_deleted",
              "subscription_renewal_reminder",
              "transaction_created",
              "transaction_updated",
              "transaction_deleted",
              "payment_succeeded",
              "payment_failed",
              "payment_refunded",
              "payment_initiated",
              "refund_initiated",
              "netd_payment_due_reminder",
              "authorization_succeeded",
              "authorization_voided",
              "card_added",
              "card_updated",
              "card_expiry_reminder",
              "card_expired",
              "card_deleted",
              "payment_source_added",
              "payment_source_updated",
              "payment_source_deleted",
              "virtual_bank_account_added",
              "virtual_bank_account_updated",
              "virtual_bank_account_deleted",
              "token_created",
              "token_consumed",
              "token_expired",
              "unbilled_charges_created",
              "unbilled_charges_voided",
              "unbilled_charges_deleted",
              "unbilled_charges_invoiced",
              "order_created",
              "order_updated",
              "order_cancelled",
              "order_delivered",
              "order_returned",
              "order_ready_to_process",
              "order_ready_to_ship",
              "quote_created",
              "quote_updated",
              "quote_deleted",
              "gift_scheduled",
              "gift_unclaimed",
              "gift_claimed",
              "gift_expired",
              "gift_cancelled",
              "gift_updated",
              "hierarchy_created",
              "hierarchy_deleted",
              "payment_intent_created",
              "payment_intent_updated"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "source",
            "type": "enum",
            "possible_values": [
              "admin_console",
              "api",
              "scheduled_job",
              "hosted_page",
              "portal",
              "system",
              "none",
              "js_api",
              "migration",
              "bulk_operation",
              "external_service"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "occurred_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "invoice",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "po_number",
          "type": "string"
        },
        {
          "name": "customer_id",
          "type": "string"
        },
        {
          "name": "subscription_id",
          "type": "string"
        },
        {
          "name": "recurring",
          "type": "boolean"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "vat_number",
          "type": "string"
        },
        {
          "name": "price_type",
          "type": "enum"
        },
        {
          "name": "date",
          "type": "timestamp"
        },
        {
          "name": "due_date",
          "type": "timestamp"
        },
        {
          "name": "net_term_days",
          "type": "integer"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "total",
          "type": "in_cents"
        },
        {
          "name": "amount_paid",
          "type": "in_cents"
        },
        {
          "name": "amount_adjusted",
          "type": "in_cents"
        },
        {
          "name": "write_off_amount",
          "type": "in_cents"
        },
        {
          "name": "credits_applied",
          "type": "in_cents"
        },
        {
          "name": "amount_due",
          "type": "in_cents"
        },
        {
          "name": "paid_at",
          "type": "timestamp"
        },
        {
          "name": "dunning_status",
          "type": "enum"
        },
        {
          "name": "next_retry_at",
          "type": "timestamp"
        },
        {
          "name": "voided_at",
          "type": "timestamp"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "sub_total",
          "type": "in_cents"
        },
        {
          "name": "sub_total_in_local_currency",
          "type": "in_cents"
        },
        {
          "name": "total_in_local_currency",
          "type": "in_cents"
        },
        {
          "name": "local_currency_code",
          "type": "string"
        },
        {
          "name": "tax",
          "type": "in_cents"
        },
        {
          "name": "first_invoice",
          "type": "boolean"
        },
        {
          "name": "has_advance_charges",
          "type": "boolean"
        },
        {
          "name": "term_finalized",
          "type": "boolean"
        },
        {
          "name": "is_gifted",
          "type": "boolean"
        },
        {
          "name": "expected_payment_date",
          "type": "timestamp"
        },
        {
          "name": "amount_to_collect",
          "type": "in_cents"
        },
        {
          "name": "round_off_amount",
          "type": "in_cents"
        },
        {
          "name": "payment_owner",
          "type": "string"
        },
        {
          "name": "deleted",
          "type": "boolean"
        },
        {
          "name": "line_items",
          "type": "list"
        },
        {
          "name": "discounts",
          "type": "list"
        },
        {
          "name": "line_item_discounts",
          "type": "list"
        },
        {
          "name": "taxes",
          "type": "list"
        },
        {
          "name": "line_item_taxes",
          "type": "list"
        },
        {
          "name": "line_item_tiers",
          "type": "list"
        },
        {
          "name": "linked_payments",
          "type": "list"
        },
        {
          "name": "dunning_attempts",
          "type": "list"
        },
        {
          "name": "applied_credits",
          "type": "list"
        },
        {
          "name": "adjustment_credit_notes",
          "type": "list"
        },
        {
          "name": "issued_credit_notes",
          "type": "list"
        },
        {
          "name": "linked_orders",
          "type": "list"
        },
        {
          "name": "notes",
          "type": "list"
        },
        {
          "name": "shipping_address",
          "type": "object"
        },
        {
          "name": "billing_address",
          "type": "object"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "include_deleted",
            "type": "boolean",
            "default": "false"
          },
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["date", "updated_at"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "subscription_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with",
              "is_present"
            ]
          },
          {
            "name": "customer_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "recurring",
            "type": "boolean",
            "possible_values": ["true", "false"],
            "operators": ["is"]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": [
              "paid",
              "posted",
              "payment_due",
              "not_paid",
              "voided",
              "pending"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "price_type",
            "type": "enum",
            "possible_values": ["tax_exclusive", "tax_inclusive"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "date",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "paid_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "total",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "amount_paid",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "amount_adjusted",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "credits_applied",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "amount_due",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "dunning_status",
            "type": "enum",
            "possible_values": [
              "in_progress",
              "exhausted",
              "stopped",
              "success"
            ],
            "operators": ["is", "is_not", "is_present"]
          },
          {
            "name": "payment_owner",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "voided_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "order",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "document_number",
          "type": "string"
        },
        {
          "name": "invoice_id",
          "type": "string"
        },
        {
          "name": "subscription_id",
          "type": "string"
        },
        {
          "name": "customer_id",
          "type": "string"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "cancellation_reason",
          "type": "enum"
        },
        {
          "name": "payment_status",
          "type": "enum"
        },
        {
          "name": "order_type",
          "type": "enum"
        },
        {
          "name": "price_type",
          "type": "enum"
        },
        {
          "name": "reference_id",
          "type": "string"
        },
        {
          "name": "fulfillment_status",
          "type": "string"
        },
        {
          "name": "order_date",
          "type": "timestamp"
        },
        {
          "name": "shipping_date",
          "type": "timestamp"
        },
        {
          "name": "note",
          "type": "string"
        },
        {
          "name": "tracking_id",
          "type": "string"
        },
        {
          "name": "batch_id",
          "type": "string"
        },
        {
          "name": "created_by",
          "type": "string"
        },
        {
          "name": "shipment_carrier",
          "type": "string"
        },
        {
          "name": "invoice_round_off_amount",
          "type": "in_cents"
        },
        {
          "name": "tax",
          "type": "in_cents"
        },
        {
          "name": "amount_paid",
          "type": "in_cents"
        },
        {
          "name": "amount_adjusted",
          "type": "in_cents"
        },
        {
          "name": "refundable_credits_issued",
          "type": "in_cents"
        },
        {
          "name": "refundable_credits",
          "type": "in_cents"
        },
        {
          "name": "rounding_adjustment",
          "type": "in_cents"
        },
        {
          "name": "paid_on",
          "type": "timestamp"
        },
        {
          "name": "shipping_cut_off_date",
          "type": "timestamp"
        },
        {
          "name": "created_at",
          "type": "timestamp"
        },
        {
          "name": "status_update_at",
          "type": "timestamp"
        },
        {
          "name": "delivered_at",
          "type": "timestamp"
        },
        {
          "name": "shipped_at",
          "type": "timestamp"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "cancelled_at",
          "type": "timestamp"
        },
        {
          "name": "discount",
          "type": "in_cents"
        },
        {
          "name": "sub_total",
          "type": "in_cents"
        },
        {
          "name": "total",
          "type": "in_cents"
        },
        {
          "name": "deleted",
          "type": "boolean"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "is_gifted",
          "type": "boolean"
        },
        {
          "name": "gift_note",
          "type": "string"
        },
        {
          "name": "gift_id",
          "type": "string"
        },
        {
          "name": "order_line_items",
          "type": "list"
        },
        {
          "name": "shipping_address",
          "type": "object"
        },
        {
          "name": "billing_address",
          "type": "object"
        },
        {
          "name": "line_item_taxes",
          "type": "list"
        },
        {
          "name": "line_item_discounts",
          "type": "list"
        },
        {
          "name": "linked_credit_notes",
          "type": "list"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "include_deleted",
            "type": "boolean",
            "default": "false"
          },
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["created_at", "updated_at"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "invoice_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "subscription_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": [
              "new",
              "processing",
              "complete",
              "cancelled",
              "voided",
              "queued",
              "awaiting_shipment",
              "on_hold",
              "delivered",
              "shipped",
              "partially_delivered",
              "returned"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "shipping_date",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "order_type",
            "type": "enum",
            "possible_values": ["manual", "system_generated"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "order_date",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "paid_on",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "created_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "plan",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "invoice_name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "price",
          "type": "in_cents"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "period",
          "type": "integer"
        },
        {
          "name": "period_unit",
          "type": "enum"
        },
        {
          "name": "trial_period",
          "type": "integer"
        },
        {
          "name": "trial_period_unit",
          "type": "enum"
        },
        {
          "name": "pricing_model",
          "type": "enum"
        },
        {
          "name": "free_quantity",
          "type": "integer"
        },
        {
          "name": "setup_cost",
          "type": "in_cents"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "archived_at",
          "type": "timestamp"
        },
        {
          "name": "billing_cycles",
          "type": "integer"
        },
        {
          "name": "redirect_url",
          "type": "string"
        },
        {
          "name": "enabled_in_hosted_pages",
          "type": "boolean"
        },
        {
          "name": "enabled_in_portal",
          "type": "boolean"
        },
        {
          "name": "addon_applicability",
          "type": "enum"
        },
        {
          "name": "tax_code",
          "type": "string"
        },
        {
          "name": "taxjar_product_code",
          "type": "string"
        },
        {
          "name": "avalara_sale_type",
          "type": "enum"
        },
        {
          "name": "avalara_transaction_type",
          "type": "integer"
        },
        {
          "name": "avalara_service_type",
          "type": "integer"
        },
        {
          "name": "sku",
          "type": "string"
        },
        {
          "name": "accounting_code",
          "type": "string"
        },
        {
          "name": "accounting_category1",
          "type": "string"
        },
        {
          "name": "accounting_category2",
          "type": "string"
        },
        {
          "name": "is_shippable",
          "type": "boolean"
        },
        {
          "name": "shipping_frequency_period",
          "type": "integer"
        },
        {
          "name": "shipping_frequency_period_unit",
          "type": "enum"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "giftable",
          "type": "boolean"
        },
        {
          "name": "claim_url",
          "type": "string"
        },
        {
          "name": "invoice_notes",
          "type": "string"
        },
        {
          "name": "taxable",
          "type": "boolean"
        },
        {
          "name": "tax_profile_id",
          "type": "string"
        },
        {
          "name": "meta_data",
          "type": "object"
        },
        {
          "name": "tiers",
          "type": "list"
        },
        {
          "name": "applicable_addons",
          "type": "list"
        },
        {
          "name": "attached_addons",
          "type": "list"
        },
        {
          "name": "event_based_addons",
          "type": "list"
        }
      ],
      "list": {
        "general_params": [],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "name",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "price",
            "type": "in_cents",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "period",
            "type": "integer",
            "operators": ["is", "is_not", "lt", "lte", "gt", "gte"]
          },
          {
            "name": "period_unit",
            "type": "enum",
            "possible_values": ["day", "week", "month", "year"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "trial_period",
            "type": "integer",
            "operators": [
              "is",
              "is_not",
              "lt",
              "lte",
              "gt",
              "gte",
              "is_present"
            ]
          },
          {
            "name": "trial_period_unit",
            "type": "enum",
            "possible_values": ["day", "month"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "addon_applicability",
            "type": "enum",
            "possible_values": ["all", "restricted"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "giftable",
            "type": "boolean",
            "possible_values": ["true", "false"],
            "operators": ["is"]
          },
          {
            "name": "pricing_model",
            "type": "enum",
            "possible_values": [
              "flat_fee",
              "per_unit",
              "tiered",
              "volume",
              "stairstep"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": ["active", "archived"],
            "operators": ["is", "is_not"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          }
        ]
      }
    },
    {
      "name": "subscription",
      "attributes": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "customer_id",
          "type": "string"
        },
        {
          "name": "currency_code",
          "type": "string"
        },
        {
          "name": "plan_id",
          "type": "string"
        },
        {
          "name": "plan_quantity",
          "type": "integer"
        },
        {
          "name": "plan_unit_price",
          "type": "in_cents"
        },
        {
          "name": "setup_fee",
          "type": "in_cents"
        },
        {
          "name": "plan_amount",
          "type": "in_cents"
        },
        {
          "name": "billing_period",
          "type": "integer"
        },
        {
          "name": "billing_period_unit",
          "type": "enum"
        },
        {
          "name": "plan_free_quantity",
          "type": "integer"
        },
        {
          "name": "status",
          "type": "enum"
        },
        {
          "name": "start_date",
          "type": "timestamp"
        },
        {
          "name": "trial_start",
          "type": "timestamp"
        },
        {
          "name": "trial_end",
          "type": "timestamp"
        },
        {
          "name": "current_term_start",
          "type": "timestamp"
        },
        {
          "name": "current_term_end",
          "type": "timestamp"
        },
        {
          "name": "next_billing_at",
          "type": "timestamp"
        },
        {
          "name": "remaining_billing_cycles",
          "type": "integer"
        },
        {
          "name": "po_number",
          "type": "string"
        },
        {
          "name": "created_at",
          "type": "timestamp"
        },
        {
          "name": "started_at",
          "type": "timestamp"
        },
        {
          "name": "activated_at",
          "type": "timestamp"
        },
        {
          "name": "gift_id",
          "type": "string"
        },
        {
          "name": "override_relationship",
          "type": "boolean"
        },
        {
          "name": "pause_date",
          "type": "timestamp"
        },
        {
          "name": "resume_date",
          "type": "timestamp"
        },
        {
          "name": "cancelled_at",
          "type": "timestamp"
        },
        {
          "name": "cancel_reason",
          "type": "enum"
        },
        {
          "name": "affiliate_token",
          "type": "string"
        },
        {
          "name": "created_from_ip",
          "type": "string"
        },
        {
          "name": "resource_version",
          "type": "long"
        },
        {
          "name": "updated_at",
          "type": "timestamp"
        },
        {
          "name": "has_scheduled_changes",
          "type": "boolean"
        },
        {
          "name": "payment_source_id",
          "type": "string"
        },
        {
          "name": "auto_collection",
          "type": "enum"
        },
        {
          "name": "due_invoices_count",
          "type": "integer"
        },
        {
          "name": "due_since",
          "type": "timestamp"
        },
        {
          "name": "total_dues",
          "type": "in_cents"
        },
        {
          "name": "mrr",
          "type": "in_cents"
        },
        {
          "name": "exchange_rate",
          "type": "bigdecimal"
        },
        {
          "name": "base_currency_code",
          "type": "string"
        },
        {
          "name": "invoice_notes",
          "type": "string"
        },
        {
          "name": "meta_data",
          "type": "object"
        },
        {
          "name": "deleted",
          "type": "boolean"
        },
        {
          "name": "addons",
          "type": "list"
        },
        {
          "name": "event_based_addons",
          "type": "list"
        },
        {
          "name": "charged_event_based_addons",
          "type": "list"
        },
        {
          "name": "coupons",
          "type": "list"
        },
        {
          "name": "shipping_address",
          "type": "object"
        },
        {
          "name": "referral_info",
          "type": "object"
        }
      ],
      "list": {
        "general_params": [
          {
            "name": "include_deleted",
            "type": "boolean"
          },
          {
            "name": "sort_by",
            "type": "string",
            "supported_attributes": ["created_at", "updated_at"],
            "supported_sort_orders": ["asc", "desc"]
          }
        ],
        "filter_params": [
          {
            "name": "id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "customer_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "plan_id",
            "type": "string",
            "operators": [
              "is",
              "is_not",
              "starts_with"
            ]
          },
          {
            "name": "status",
            "type": "enum",
            "possible_values": [
              "future",
              "in_trial",
              "active",
              "non_renewing",
              "paused",
              "cancelled"
            ],
            "operators": ["is", "is_not"]
          },
          {
            "name": "cancel_reason",
            "type": "enum",
            "possible_values": [
              "not_paid",
              "no_card",
              "fraud_review_failed",
              "non_compliant_eu_customer",
              "tax_calculation_failed",
              "currency_incompatible_with_gateway",
              "non_compliant_customer"
            ],
            "operators": ["is", "is_not", "is_present"]
          },
          {
            "name": "remaining_billing_cycles",
            "type": "integer",
            "operators": [
              "is",
              "is_not",
              "lt",
              "lte",
              "gt",
              "gte",
              "is_present"
            ]
          },
          {
            "name": "created_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "activated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "next_billing_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "cancelled_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "has_scheduled_changes",
            "type": "boolean",
            "possible_values": ["true", "false"],
            "operators": ["is"]
          },
          {
            "name": "updated_at",
            "type": "timestamp",
            "operators": ["after", "before", "on"]
          },
          {
            "name": "override_relationship",
            "type": "boolean",
            "possible_values": ["true", "false"],
            "operators": ["is"]
          }
        ]
      }
    }
  ]
}
}