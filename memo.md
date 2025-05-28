# 作成イメージ
## まとめ
- 患者・管理者ログイン画面
- 患者予約・予約取り消し画面
- 管理者　予約一覧画面

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