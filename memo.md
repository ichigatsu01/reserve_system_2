# 作成イメージなど

## Todo
- クリックイベントの強化：既に予約が入っているところはalertを出す
- カレンダーイベントのうち自分の予約分が分かるようにする：診療番号一致で色を変える？
- 管理者向けログイン（FirebaseOATH）
- 予約変更機能(実装延期)
- 予約取消機能(実装延期)

## 作成の狙い
ReactやMUIに頼らず、JavaScriptでサイトを作る。  
以前作ったFirebaseの認証機能をもう一度使う。    
予定ではTypeScriptの練習も兼ねるつもりだったが、Reactと組み合わせるほうが効果的と判断して今回は見送り。     
     → Firebaseを活用するにはNode.jsがないとややこしそう
     → ある程度作成が進んだところでVanilaJSでの画面遷移回りに限界を感じ始める
     → 結局React + Vite + TypeScriptで作ることに

## 色
<span style="display:inline-block;width:20px;height:20px;background:#454545;border-radius:4px;margin-right:8px;"></span> #454545  
<span style="display:inline-block;width:20px;height:20px;background:#79A1D4;border-radius:4px;margin-right:8px;"></span> #79A1D4  
<span style="display:inline-block;width:20px;height:20px;background:#9fbcdf;border-radius:4px;margin-right:8px;"></span> #9fbcdf  
<span style="display:inline-block;width:20px;height:20px;background:#abcae8;border-radius:4px;margin-right:8px;"></span> #abcae8  
<span style="display:inline-block;width:20px;height:20px;background:#ffeed5;border-radius:4px;margin-right:8px;"></span> #ffeed5  
#454545 #79A1D4 #9fbcdf #abcae8 #ffeed5     
参考：https://saruwakakun.com/design/gallery/palette

## JavaScriptの今更ながらの復習
- 関数に()を付けて書くか、付けないかの違い   
()を付ける：その場で実行する　()を付けない：関数名そのものをなんらかに引き渡すか。

## その他メモ
- 変数をjsファイルをまたいで使う知識の習得   
const hoge = new Fullcalender... ではなく window.hoge = new Fullcalender...と書く
- Routeを使うか否か      
Routeを使うメリットはアドレスが明示的になりユーザビリティが増すこと。      
ただしアドレス直打ちでログインをスキップ出来てしまうので、「ルートガード」なる技を使う必要がある。       
とりあえず今回は機能画面が少なく、Firebaseとの連携を重視したいためにログイン（isLogin）での対応とする。
- Viteがローカルで使う環境変数の書き方  
「.env.local」で固定。.envは決して拡張子ではないので、ファイル名を追記してはいけない。    
- エラーチェックについてはログイン画面より予約確認画面への移行タイミングの物の方がすっきり書けている     
set関数を乱発していないのがポイント。

## Firestoreの理解を深める
- さんざん苦しめられている。ちょっと理解は出来てきたかもしれない？    
firestoreに登録された内容を引っ張ってくる。  
getDocsで取得できるデータ：QueryDocumentSnapshot(Firestoreの正式なクラス名らしい)には様々なプロパティを持つ。      
.size=何件ヒットしたか、.empty=空かどうか。その中の.docsが中にあるドキュメントの一覧。    
     - イメージ：   
     ```
     querySnapshot.docs = [
     QueryDocumentSnapshot,
     QueryDocumentSnapshot,
     ...
     ]
     ```  

## 反省
- onSnapshotを使う見込みがあるなら早めに組んだ方がいい      
予約画面が出来上がる段階で、予約完了後にそれが画面に反映されないことに気付く。  
当初感じていたはずだが完全に忘れていた。これは次回への反省とする。    
- Route使用の是非   
Reactのレンダリングにかなり頼っていたが、今回はルーティングを採用していれば     
予約の各処理実行後に画面遷移をすることでややこしい処理をせずにカレンダーの更新が出来たと思う。      
ただ、Routeをどういう場面で採用するべきかはまだ分かっていない。