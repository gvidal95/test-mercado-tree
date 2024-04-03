export interface StoreDataResponse {
  site_id:                   SiteID;
  seller:                    Seller;
  country_default_time_zone: string;
  paging:                    Paging;
  results:                   Product[];
  sort:                      Sort;
  available_sorts:           Sort[];
  filters:                   any[];
  available_filters:         AvailableFilter[];
  pdp_tracking:              PDPTracking;
}

export interface AvailableFilter {
  id:     string;
  name:   string;
  type:   string;
  values: AvailableFilterValue[];
}

export interface AvailableFilterValue {
  id:      string;
  name:    string;
  results: number;
  categories?: [];
}

export interface Sort {
  id:   string;
  name: string;
}

export interface Paging {
  total:           number;
  primary_results: number;
  offset:          number;
  limit:           number;
}

export interface PDPTracking {
  group:        boolean;
  product_info: ProductInfo[];
}

export interface ProductInfo {
  id:     string;
  score:  number;
  status: Status;
}

export enum Status {
  Shown = "shown",
}

export interface Product {
  id:                    string;
  title:                 string;
  condition:             Condition;
  thumbnail_id:          string;
  catalog_product_id:    string;
  listing_type_id:       ListingTypeID;
  permalink:             string;
  buying_mode:           BuyingMode;
  site_id:               SiteID;
  category_id:           string;
  domain_id:             string;
  thumbnail:             string;
  currency_id:           CurrencyID;
  order_backend:         number;
  price:                 number;
  original_price:        number | null;
  sale_price:            null;
  available_quantity:    number;
  official_store_id:     number;
  use_thumbnail_id:      boolean;
  accepts_mercadopago:   boolean;
  shipping:              Shipping;
  stop_time:             Date;
  seller:                Seller;
  attributes:            Attribute[];
  installments:          Installments;
  winner_item_id:        null;
  catalog_listing:       boolean;
  discounts:             null;
  promotions:            any[];
  differential_pricing?: DifferentialPricing;
  inventory_id:          null | string;
  official_store_name?:  OfficialStoreName;
}

export interface Attribute {
  id:                   string;
  name:                 string;
  value_id:             null | string;
  value_name:           string;
  attribute_group_id:   AttributeGroupID;
  attribute_group_name: AttributeGroupName;
  value_struct:         Struct | null;
  values:               AttributeValue[];
  source:               number;
  value_type:           ValueType;
}

export enum AttributeGroupID {
  Main = "MAIN",
  Others = "OTHERS",
}

export enum AttributeGroupName {
  Otros = "Otros",
  Principales = "Principales",
}

export interface Struct {
  number: number;
  unit:   Unit;
}

export enum Unit {
  CM = "cm",
  G = "g",
  Kg = "kg",
  LB = "lb",
  M = "m",
  Mm = "mm",
  Va = "VA",
  W = "W",
}

export enum ValueType {
  List = "list",
  Number = "number",
  NumberUnit = "number_unit",
  String = "string",
}

export interface AttributeValue {
  id:     null | string;
  name:   string;
  struct: Struct | null;
  source: number;
}

export enum BuyingMode {
  BuyItNow = "buy_it_now",
}

export enum Condition {
  New = "new",
}

export enum CurrencyID {
  Ars = "ARS",
}

export interface DifferentialPricing {
  id: number;
}

export interface Installments {
  quantity:    number;
  amount:      number;
  rate:        number;
  currency_id: CurrencyID;
}

export enum ListingTypeID {
  GoldPro = "gold_pro",
  GoldSpecial = "gold_special",
}

export enum OfficialStoreName {
  APCSoluciones = "APC Soluciones",
  Cisco = "Cisco",
  Dell = "Dell",
  Linksys = "Linksys",
}

export interface Seller {
  id:       number;
  nickname: Nickname;
}

export enum Nickname {
  Oportutek = "OPORTUTEK",
}

export interface Shipping {
  store_pick_up: boolean;
  free_shipping: boolean;
  logistic_type: LogisticType;
  mode:          Mode;
  tags:          Tag[];
  benefits:      null;
  promise:       null;
}

export enum LogisticType {
  CrossDocking = "cross_docking",
  Fulfillment = "fulfillment",
  NotSpecified = "not_specified",
}

export enum Mode {
  Me2 = "me2",
  NotSpecified = "not_specified",
}

export enum Tag {
  Fulfillment = "fulfillment",
  MandatoryFreeShipping = "mandatory_free_shipping",
  SelfServiceIn = "self_service_in",
}

export enum SiteID {
  Mla = "MLA",
}


// Category
export interface Category {
  id:                           string;
  name:                         string;
  picture:                      string;
  permalink:                    string;
  total_items_in_this_category: number;
  path_from_root:               PathFromRoot[];
  children_categories:          ChildrenCategory[];
  attribute_types:              string;
  settings:                     CategorySettings;
  channels_settings:            ChannelsSetting[];
  meta_categ_id:                null;
  attributable:                 boolean;
  date_created:                 Date;
}

export interface ChannelsSetting {
  channel:  string;
  settings: ChannelsSettingSettings;
}

export interface ChannelsSettingSettings {
  minimum_price?:     number;
  status?:            string;
  buying_modes?:      string[];
  immediate_payment?: string;
}

export interface ChildrenCategory {
  id:                           string;
  name:                         string;
  total_items_in_this_category: number;
}

export interface PathFromRoot {
  id:   string;
  name: string;
}

export interface CategorySettings {
  adult_content:             boolean;
  buying_allowed:            boolean;
  buying_modes:              string[];
  catalog_domain:            string;
  coverage_areas:            string;
  currencies:                string[];
  fragile:                   boolean;
  immediate_payment:         string;
  item_conditions:           string[];
  items_reviews_allowed:     boolean;
  listing_allowed:           boolean;
  max_description_length:    number;
  max_pictures_per_item:     number;
  max_pictures_per_item_var: number;
  max_sub_title_length:      number;
  max_title_length:          number;
  max_variations_allowed:    number;
  maximum_price:             null;
  maximum_price_currency:    string;
  minimum_price:             number;
  minimum_price_currency:    string;
  mirror_category:           null;
  mirror_master_category:    null;
  mirror_slave_categories:   any[];
  price:                     string;
  reservation_allowed:       string;
  restrictions:              any[];
  rounded_address:           boolean;
  seller_contact:            string;
  shipping_options:          string[];
  shipping_profile:          string;
  show_contact_information:  boolean;
  simple_shipping:           string;
  stock:                     string;
  sub_vertical:              string;
  subscribable:              boolean;
  tags:                      any[];
  vertical:                  string;
  vip_subdomain:             string;
  buyer_protection_programs: string[];
  status:                    string;
}
