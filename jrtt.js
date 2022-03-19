@@ -12,10 +12,11 @@ V2P重写：
#今日头条极速版
1-59/15 6-23 * * *  https://raw.githubusercontent.com/Alxcky/Ym/main/jrtt.js, tag=今日头条极速版, enabled=true
[rewrite_local]
luckycat/lite/v1/task/page_data url script-request-header https://raw.githubusercontent.com/Alxcky/Ym/main/jrtt.js
luckycat\/lite\/v1\/task\/page_data url script-request-header https://raw.githubusercontent.com/Alxcky/Ym/main/jrtt.js
[MITM]
hostname = i.snssdk.com //安卓版
hostname = api3-normal-lq.toutiaoapi.com //IOS版
#每个人的域名不同，都放进去MITM吧，还捉不到就自行捉包填写
hostname = *.snssdk.com
hostname = *.toutiaoapi.com
青龙把极速版捉包里面的cookie放到jrttjsbHeader里，多账户用@隔开
*/
 @@ -37,10 +38,13 @@ let curHour = curTime.getHours()
let host = 'api3-normal-lq.toutiaoapi.com'
let hostname = 'https://' + host

let userAgent = ($.isNode() ? process.env.jrttjsbUA : $.getdata('jrttjsbUA')) || 'NewsLite 8.5.2 rv:8.5.2.21 (iPhone; iOS 15.0; zh_CN) Cronet';
let userAgentArr = []
let userHeader = ($.isNode() ? process.env.jrttjsbHeader : $.getdata('jrttjsbHeader')) || '';
let userHeaderArr = []

let userIdx = 0
let UAcount = 0
let userStatus = []
let maxReadPerRun = 10
let readList = []
 @@ -117,7 +121,15 @@ async function checkEnv() {
        return false
    }

    console.log(`共找到${userHeaderArr.length}个用户`)
    if(userAgent) {
        userAgentArr = userAgent.split('@')
    } else {
        console.log('未找到userAgent')
        return false
    }
    UAcount = userAgentArr.length

    console.log(`共找到${userHeaderArr.length}个用户，${UAcount}个UA`)
    return true
}

 @@ -166,7 +178,7 @@ async function RunMultiUser() {
//阅读列表
async function ListArts() {
    let caller = printCaller()
    let url = `${hostname}/api/news/feed/v64/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/api/news/feed/v64/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -205,7 +217,7 @@ async function ReadArticles() {
//阅读奖励
async function ReadArtsReward(group_id) {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/activity/done_whole_scene_task/?aid=35&update_version_code=82809&os_version=15.0&device_platform=iphone`
    let url = `${hostname}/luckycat/lite/v1/activity/done_whole_scene_task/?aid=35&update_version_code=85221&os_version=15.0&device_platform=iphone`
    let body = `{"is_golden_egg":false,"scene_key":"article_detail","group_id":"${group_id}"}`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
 @@ -222,7 +234,7 @@ async function ReadArtsReward(group_id) {
//阅读翻倍
async function ReadDouble() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/activity/double_whole_scene_task/?aid=35&update_version_code=82809&os_version=15.0&device_platform=iphone`
    let url = `${hostname}/luckycat/lite/v1/activity/double_whole_scene_task/?aid=35&update_version_code=85221&os_version=15.0&device_platform=iphone`
    let body = `{}`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
 @@ -238,7 +250,7 @@ async function ReadDouble() {

async function GetNewTabs() {
    let caller = printCaller()
    let url = `${hostname}/score_task/v1/user/new_tabs/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/score_task/v1/user/new_tabs/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -257,7 +269,7 @@ async function GetNewTabs() {
async function PostInviteCode() {
    let caller = printCaller()
    let body = `{"invitecode" : "1173836876"}`
    let url = `${hostname}/luckycat/lite/v1/invite/post_invite_code/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/invite/post_invite_code/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -268,7 +280,7 @@ async function PostInviteCode() {
//查询用户信息,任务状态
async function QueryUserInfo(doTask) {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/task/page_data/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/task/page_data/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -305,7 +317,7 @@ async function QueryUserInfo(doTask) {
//签到
async function SignIn() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/sign_in/action?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/sign_in/action?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -321,7 +333,7 @@ async function SignIn() {
//开宝箱
async function OpenTreasureBox() {
    let caller = printCaller()
    let url = `${hostname}/score_task/v1/task/open_treasure_box/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/score_task/v1/task/open_treasure_box/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -337,7 +349,7 @@ async function OpenTreasureBox() {
//宝箱视频奖励
async function ExcitationAd(task_id) {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/task/done/excitation_ad?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/task/done/excitation_ad?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let body = `{"ad_alias_position":"coin","task_key":"excitation_ad", "task_id" : "${task_id}"}`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
 @@ -356,7 +368,7 @@ async function ExcitationAd(task_id) {
//查询走路状态
async function QueryWalkInfo() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/walk/page_data/?aid=35&update_version_code=82809&os_version=15.0&device_platform=iphone`
    let url = `${hostname}/luckycat/lite/v1/walk/page_data/?aid=35&update_version_code=85221&os_version=15.0&device_platform=iphone`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -373,7 +385,7 @@ async function QueryWalkInfo() {
async function GetWalkBonus() {
    let caller = printCaller()
    let nowtime = Math.round(new Date().getTime()/1000)
    let url = `${hostname}/luckycat/lite/v1/walk/bonus/?aid=35&update_version_code=82809&os_version=15.0&device_platform=iphone`
    let url = `${hostname}/luckycat/lite/v1/walk/bonus/?aid=35&update_version_code=85221&os_version=15.0&device_platform=iphone`
    let body = `{"task_id":136,"enable_preload_exciting_video":0,"client_time":${nowtime},"rit":"","use_ecpm":0}`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
 @@ -390,7 +402,7 @@ async function GetWalkBonus() {
//吃饭补贴
async function DoneEat() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/eat/done_eat/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/eat/done_eat/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -406,7 +418,7 @@ async function DoneEat() {
//睡觉状态
async function QuerySleepStatus() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/sleep/status/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/sleep/status/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -449,7 +461,7 @@ async function QuerySleepStatus() {
//睡觉醒来
async function SleepStop() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/sleep/stop/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/sleep/stop/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -467,7 +479,7 @@ async function SleepStop() {
//睡觉收金币
async function SleepDone(amount) {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/sleep/done_task/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/sleep/done_task/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let body = `{"score_amount" : ${amount}}`
    let urlObject = populatePostUrl(url,body)
    await httpPost(urlObject,caller)
 @@ -484,7 +496,7 @@ async function SleepDone(amount) {
//开始睡觉
async function SleepStart() {
    let caller = printCaller()
    let url = `${hostname}/luckycat/lite/v1/sleep/start/?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/luckycat/lite/v1/sleep/start/?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populatePostUrl(url)
    await httpPost(urlObject,caller)
    let result = httpResult;
 @@ -501,7 +513,7 @@ async function SleepStart() {
//查询农场状态
async function QueryFarmInfo() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/polling_info?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/polling_info?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -541,7 +553,7 @@ async function FarmOfflineDouble() {
//查询农场任务列表
async function QueryFarmTask() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/daily_task/list?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/daily_task/list?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -578,7 +590,7 @@ async function RewardFarmTask(id) {
//农场-浇水
async function FarmWater() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/land_water?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/land_water?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -598,7 +610,7 @@ async function FarmWater() {
//农场-开宝箱
async function FarmOpenBox() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/box/open?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/box/open?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -615,7 +627,7 @@ async function FarmOpenBox() {
//农场-宝箱视频
async function FarmOpenBoxVideo() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/excitation_ad/add?excitation_ad_score_amount=134&device_id=2392172203611735&aid=35&os_version=15.0&update_version_code=82809`
    let url = `${hostname}/ttgame/game_farm/excitation_ad/add?excitation_ad_score_amount=134&device_id=2392172203611735&aid=35&os_version=15.0&update_version_code=85221`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -631,7 +643,7 @@ async function FarmOpenBoxVideo() {
//农场-签到状态
async function QueryFarmSignStatus() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/sign_in/list?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/sign_in/list?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -652,7 +664,7 @@ async function QueryFarmSignStatus() {
//农场-签到
async function FarmSign() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/reward/sign_in?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/reward/sign_in?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -669,7 +681,7 @@ async function FarmSign() {
//农场-签到视频翻倍
async function FarmSignDouble() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/reward/double_sign_in?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/reward/double_sign_in?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -686,7 +698,7 @@ async function FarmSignDouble() {
//农场-土地状态
async function QueryFarmLandStatus() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/home_info?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/home_info?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -707,7 +719,7 @@ async function QueryFarmLandStatus() {
//农场-土地解锁
async function FarmUnlock(land_id) {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_farm/land/unlock?land_id=${land_id}&aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_farm/land/unlock?land_id=${land_id}&aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -723,7 +735,7 @@ async function FarmUnlock(land_id) {
//种树-签到状态
async function QueryTreeSignStatus() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/sign_in/list?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/sign_in/list?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -741,7 +753,7 @@ async function QueryTreeSignStatus() {
//种树-签到
async function TreeSign() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/sign_in/reward?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/sign_in/reward?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -757,7 +769,7 @@ async function TreeSign() {
//种树-二选一-选项
async function QueryTreeChallenge() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/challenge/list?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/challenge/list?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -797,7 +809,7 @@ async function TreeChallengeChoose(id) {
//种树-二选一-领奖
async function TreeChallengeReward() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/challenge/reward?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/challenge/reward?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -813,7 +825,7 @@ async function TreeChallengeReward() {
//种树-化肥签到
async function TreeNutrientSign() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/nutrient/sign_in?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/nutrient/sign_in?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -833,7 +845,7 @@ async function TreeNutrientSign() {
//种树-水滴任务列表
async function QueryTreeWaterTask() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/tasks/list?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/tasks/list?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -869,7 +881,7 @@ async function TreeWaterReward(task_id) {
//种树-浇水
async function TreeWater() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/tree/water?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/tree/water?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -915,7 +927,7 @@ async function TreeWaterTenTimes() {
//种树-信息
async function QueryTreeStatus() {
    let caller = printCaller()
    let url = `${hostname}/ttgame/game_orchard/polling_info?aid=35&update_version_code=82809&device_platform=iphone&&device_type=iPhone13,2`
    let url = `${hostname}/ttgame/game_orchard/polling_info?aid=35&update_version_code=85221&device_platform=iphone&&device_type=iPhone13,2`
    let urlObject = populateGetUrl(url)
    await httpGet(urlObject,caller)
    let result = httpResult;
 @@ -967,7 +979,7 @@ function populatePostUrl(url,reqBody=''){
            'Accept' : 'application/json',
            'Cookie' : userHeaderArr[userIdx],
            'Content-Type' : 'application/json',
            'User-Agent' : 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; iPhone13,2 Build/HUAWEIiPhone13,2) NewsArticle/8.2.8 tt-ok/3.10.0.2',
            'User-Agent' : userAgentArr[userIdx%UAcount],
            'Accept-Encoding' : 'gzip, deflate',
        },
        body: reqBody
 @@ -988,7 +1000,7 @@ function populateGetUrl(url){
            'Accept' : 'application/json',
            'Cookie' : userHeaderArr[userIdx],
            'Content-Type' : 'application/json',
            'User-Agent' : 'Dalvik/2.1.0 (Linux; U; Android 7.1.2; iPhone13,2 Build/HUAWEIiPhone13,2) NewsArticle/8.2.8 tt-ok/3.10.0.2',
            'User-Agent' : userAgentArr[userIdx%UAcount],
            'Accept-Encoding' : 'gzip, deflate',
        }
    }
