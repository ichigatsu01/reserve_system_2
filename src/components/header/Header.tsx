import './Header.css'

const Header = () => {
    return (
        <header id="header">
            <div id="logo">😺ささみまぐろペットクリニック</div>
            <div id="navi">
                <ul>
                    <li>HOME</li>
                    <li>診療について</li>
                    <li>よくある質問</li>
                    <li>医師の紹介</li>
                    <li>受診の仕方</li>
                    <li id="reserve">Web順番予約</li>
                    <li>アクセス</li>
                    <li>お知らせ</li>
                </ul>
            </div>
        </header>
)
}

export default Header