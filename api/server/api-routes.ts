export const ApiRoutes = {
  createUser: "addUser",
  profile: {
    oneUser: "getOneUserProfile",
    editMyProfile: "editMyProfile",
    userBazaarCityList: "userBazaarCityList",
    editOneBazaarCityPost: "editOneBazaarCityPost",
    deleteOneBazaarCityPost: "deleteOneBazaarCityPost",
    ListUserByeBuyItem: "ListUserByeBuyItem",
  },
  userProfileDetails: {
    userFoodTripList: "userFoodTripList",
  },
  pinoyPreneurs: {
    list: "GetPinoyPreneursList",
    postProduct: "addPinoyPreneur",
    viewProduct: "GetOnePinoyPreneur",
    checkUser: "checkUserPinoyPreneur",
    editDetails: "editPinoyPreneur",
  },
  homePage: {
    whatsupcanada: "HomePageArticlesList",
    newPinoyBlock: "HomePageNewPinoysList",
    shoutOutsList: "shoutOutsList",
    goodVibesList: "GoodVibesList",
    userSurveyList: "UserSurveyList",
    getOneSurvey: "getOneSurvey",
    postVoteForSurvey: "postVoteForSurvey",
    pinoyPreneursList: "HomePagePinoypreneursList",
  },
  whatsUpCanada: {
    overall: "WhatsUpCanadaHome",
    viewArticles: "viewOneArticle",
    viewPodcast: "viewPodcast",
    relatedPodcast: "relatedPodcastList",
    relatedArticles: "relatedArticleList",
  },
  newPinoyOntheBlock: {
    list: "newPinoysArticleList",
    viewOne: "newPinoysArticleDetails",
    relatedArticle: "newPinoysHomeRelatedArticles",
    viewRelatedArticle: "newPinoysRelatedArticles",
  },
  niknok: {
    list: "niknokList",
    viewImages: "getNiknokDetail",
  },
  tambayans: {
    tambayanList: "tambayanList",
    postTambayan: "PostTambayan",
    viewTambayan: "viewTambayanPost",
    editTambayanPost: "editOneTambayanPost",
    deleteTambayanPost: "deleteOneTambayanPost",
  },
  foodTrip: {
    postList: "ListfoodTrip",
    postFoodTrip: "PostfoodTrip",
    searchFootTrip: "searchFoodTrip",
    viewFoodTip: "getOnefoodTrip",
    featurepost: "featurePost",
    getFeaturePost: "getFeaturePostList",
    recipeSharing: "recipeSharingList",
    editFoodTripPost: "editOneFoodTripPost",
    deleteFoodTripPost: "deleteOneFoodTripPost",
  },
  postLike: "postLike",
  pnation: {
    postEvent: "PostpNationCalander",
    listEvent: "pNationCalanderList",
    viewEvent: "getpNationCalander",
    addFeaturePost: "addFeaturePost",
    deletePost: "deleteOnePnationCalander",
    editPost: "editOnePnationCalander",
  },
  commentsList: {
    listComments: "commentsList",
    postComment: "comments",
  },
  jobCentre: {
    listJobPost: "getAllJobList",
    addJobPost: "addJobPost",
    editJobPost: "editOneJobPost",
    viewPost: "getOneJobPost",
    saveDraft: "addJobDraft",
    getDraft: "getOneJobDraft",
    listJobfair: "getJobFairList",
    jobPostPayment: "createJobPayment",
  },
  buyanihan: {
    listBuyanihan: "DonasyanList",
    postBuyanihan: "PostDonasyan",
    getOneBuyanihan: "getOneByeBuy",
    editOneByeBuy: "editOneByeBuyItem",
    DeleteUserBuyBuy: "DeleteUserBuyBuyItem",
  },
  bazaarCity: {
    addBazaarCity: "addBazaarCityItem",
    GetBazaarCityList: "GetBazaarCityList",
    GetOneBazaarCityUserPost: "GetOneBazaarCityUserPost",
    addFeaturePost: "addFeaturePost",
    deleteOneBazaarCityPost: "deleteOneBazaarCityPost",
    editOneBazaarCityPost: "editOneBazaarCityPost",
  },
  connections: {
    getUserConnectionList: "getUserConnectionList",
    userConnectRequest: "userConnectRequest",
    userDisconnectRequest: "userDisconnectRequest",
  },
  globalSearch: {
    userGlobalSearch: "userGlobalSearch",
  },
  notification:{
    getAllNotificationList:"getAllNotificationList",
    getAllUnreadNotificationCount:"getAllUnreadNotificationCount"
  }
};