export const USER_PERMISSIONS = {
  // client permission
  client_view: "clientView",
  client_create: "clientCreate",
  client_listing: "clientListing",
  client_edit: "clientUpdate",
  client_delete: "clientDelete",
  // project permission
  project_view: "projectView",
  project_edit: "projectUpdate",
  project_listing: "projectListing",
  project_delete: "projectDelete",
  project_create: "projectCreate",
  project_requirement_create: "projectRequirementCreate",
  project_requirement_edit: "projectRequirementEdit",
  project_requirement_import: "projectRequirementImport",
  project_requirement_delete: "projectRequirementDelete",

  // estimation permission
  estimation_view: "estimationView",
  // estimation_edit: "estimationUpdate",
  estimation_list: "estimationListing",
  estimation_delete: "estimationDelete",
  estimation_create: "estimationCreate",
  estimation_configuation: "estimationConfiguation",
  estimation_attribute_data: "estimationAttributeData",
  estimation_calc_attribute_data: "estimation_calc_attribute_data",
  estimation_export_excel: "estimation_export_excel",
  estimation_generate_resourcemix: "estimation_generate_resourcemix",
  estimation_generate_timeline: "estimation_generate_timeline",
  estimation_export_resourcemix: "estimation_export_resourcemix",
  estimation_export_timeline: "estimation_export_timeline",
  estimation_share: "estimation_share", // Not implemented
  estimation_requirement_add: "estimation_requirement_add",
  estimation_pricing_view: "estimation_pricing_view",
  estimation_add_review_comment: "estimation_add_review_comment", // Not implemented
  estimation_resourcecount_edit: "estimation_resourcecount_edit",
  estimation_requirement_delete: "estimation_requirement_delete",
  estimation_requirement_edit: "estimation_requirement_edit",
  estimation_versioning: "estimation_versioning",
  estimation_release: "estimation_release",
  all_estimation_data: "all_estimation_data",
  //user manangement for admin
  user_management_listing: "user_management_listing",
};

export const ESTIMATION_PERMISSION = {
  this_estimation_view: false,
  this_estimation_list: false,
  this_estimation_delete: false,
  this_estimation_create: false,
  this_estimation_configuation: false,
  this_estimation_attribute_data: false,
  this_estimation_calc_attribute_data: false,
  this_estimation_export_excel: false,
  this_estimation_generate_resourcemix: false,
  this_estimation_generate_timeline: false,
  this_estimation_export_resourcemix: false,
  this_estimation_export_timeline: false,
  this_estimation_share: false, // Not implemented
  this_estimation_requirement_add: false,
  this_estimation_pricing_view: false,
  this_estimation_add_review_comment: false, // Not implemented
  this_estimation_resourcecount_edit: false,
  estimation_requirement_delete: false,
  estimation_requirement_edit: false,
  estimation_versioning: false,
  estimation_release: false,
  all_estimation_data: false
};
