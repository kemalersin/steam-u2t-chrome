const ROTATION_TIMEOUT = 1000 * 3;

const PRICE_REGEX = /\$([0-9,]+\.\d{2})\s*(USD)?/;

const CURRENCIES = {
  USD: 1,
  TRY: 2,
};

const CURRENCY_CODES = {
  USD: "USD",
  TRY: "TRY"
};

const PRESENTATIONS = {
  MAIN_CURRENCY: 1,
  SIDE_BY_SIDE: 2,
  ROTATIVE: 3,
  HOVER: 4,
};

const COMMISSIONS = {
  NONE: 0,
};

const DECIMALS = {
  SHOW: true,
  HIDE: false,
};

const AUTO_CLOSE = {
  YES: true,
  NO: false,
};

const HOVER_STYLE = {
  POSITION: "relative",
  Z_INDEX: "99999"
};

const STORAGE_KEYS = {
  USD_RATE: "usdRate"
};

const DEFAULT_OPTIONS = {
  currency: CURRENCIES.TRY,
  presentation: PRESENTATIONS.SIDE_BY_SIDE,
  commission: COMMISSIONS.NONE,
  decimals: DECIMALS.SHOW,
  autoClose: AUTO_CLOSE.YES
};

const CUSTOM_HTML_SIGN = "u2t";
const CUSTOM_HTML_SIGN_SELECTOR = `.${CUSTOM_HTML_SIGN}`;
const CUSTOM_HTML_DATA_SELECTOR = "[data-multiplied-price]";

const STEAM_HTML_SELECTORS = [
  ".price",
  ".normal_price span",
  ".discount_final_price",
  ".game_purchase_price",
  ".game_area_dlc_price",
  ".your_price div",
  ".salepreviewwidgets_StoreSalePriceBox_Wh0L8",
  ".market_commodity_orders_header_promote",
  ".market_commodity_orders_table td",
  "#marketWalletBalanceAmount",
  "#header_wallet_balance",
  "#search_suggestion_contents .match_subtitle"
];
