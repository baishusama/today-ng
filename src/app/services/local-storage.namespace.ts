// ImoNote: “在用 local storage 进行存储的时候使用命名空间是个最佳实践，命名空间可以是应用名加模块名等形式。”
export const GLOBAL_NAMESPACE = 'today.';

export const APP_INFO_NAMESPACE = GLOBAL_NAMESPACE + 'appInfo.';
export const INIT_FLAG = GLOBAL_NAMESPACE + 'initFlag.';
export const START_USING_DATE = GLOBAL_NAMESPACE + 'startUsingDate.';

export const USER_INFO_NAMESPACE = GLOBAL_NAMESPACE + 'userInfo.';
export const USERNAME = USER_INFO_NAMESPACE + 'username';
export const AVATAR_CODE = USER_INFO_NAMESPACE + 'avatarCode';

export const TODO_NAMESPACE = GLOBAL_NAMESPACE + 'todo.';
export const TODOS = TODO_NAMESPACE + 'todos';

export const LIST_NAMESPACE = GLOBAL_NAMESPACE + 'list.';
export const LISTS = LIST_NAMESPACE + 'lists';

export const SUMMARY_NAMESPACE = GLOBAL_NAMESPACE + 'summary.';
export const LAST_SUMMARY_DATE = SUMMARY_NAMESPACE + 'lastSummaryDate';
export const SUMMARIES = SUMMARY_NAMESPACE + 'summaries';
