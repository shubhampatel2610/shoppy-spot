// Product status is the same enum on both sides (draft/active/archived - see
// database/schema.sql's product_status type), so the badge colors and filter
// options are reused as-is from the vendor side instead of duplicated.
export { PRODUCT_STATUS_FILTER_OPTIONS, PRODUCT_STATUS_BADGE_CLASS } from './vendorProductConstants';
