import FullCalendar from '@fullcalendar/react'
import { Box } from '@mui/material'
import type { DateClickArg, EventContentArg } from 'fullcalendar/index.js'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import { useContext, useEffect, useState } from 'react'
import { InputContext } from '../providers/ReserveProvider'
import InputReserve from './InputReserve/InputReserve'
import ReserveConfirm from './InputReserve/ReserveConfirm'

//* memo:
//* EventContentArg ... イベントの内容を表示するための型
//* DateClickArg ... 日付をクリックしたときの情報

const AddCalendar = () => {
    // Firebaseにデータを渡すために変数を引っ張ってくる
    const { isOpenForm, setIsOpenForm, isOpenConfirm } = useContext(InputContext)

    // !InputReserveに渡すargの獲得
    const [ dateArg, setDateArg ] = useState<DateClickArg | null>(null)

    const events = [
        // 営業時間外の色を強調したい
        {
        daysOfWeek: [0, 3],
        display: 'background',
        color: '#000'
        },
        {
        startTime: '13:00',
        endTime: '16:00',
        daysOfWeek: [1, 2, 4, 5],
        display: 'background',
        color: '#000'
        },
        {
        startTime: '13:00',
        endTime: '21:00',
        daysOfWeek: [6],
        display: 'background',
        color: '#000'
        },
        // ここから通常イベント
        { title: '予約済み（現在時刻）', start: new Date()}
    ]

    // 日付クリック関数
    useEffect(() => {
        if (dateArg) {
            setIsOpenForm(true)
        }
    }, [dateArg])
    const handleDateClick = (arg: DateClickArg) => {
        setDateArg(arg)
    }

    // Fullcalendarを作成する
    function executeCalendar() {
        return (
            <Box sx={{backgroundColor: '#fff', padding: '20px', borderRadius: '20px'}}>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin ]} // これを読み込ませないとtimeGridWeekが動かない
                    initialView='timeGridWeek' // カレンダーを週単位で表示する
                    events={events} // カレンダー内に表示するイベント
                    eventContent={renderEventContent} // イベントのうち何を表示するかを調整する
                    locale={'ja'} // 日本語表記
                    height={'auto'} // これがないと画面の高さを大きく取ってしまう
                    allDaySlot={false} // trueの場合、カレンダーのトップに各日付の全体を指定するエリアが表示される
                    eventColor='#888' // 既に予約が入っている、休診日などは灰色
                    slotMinTime={'09:00:00'} // 始業時間
                    slotMaxTime={'21:00:00'} // 就業時間
                    slotDuration={'00:30:00'} // 30分単位で表示する
                    dayHeaderContent={function(arg) { // スマホでもシンプルに表示できるよう日付+曜日で表示
                        const date = arg.date;
                        const day = date.getDate();
                        const weekdayNames = ['日', '月', '火', '水', '木', '金', '土'];
                        const weekday = weekdayNames[date.getDay()];

                        const container = document.createElement('div')
                        container.innerHTML = `${day}<br><span>(${weekday})</span>`;
                        return { domNodes: [container]}
                    }}
                    dateClick={handleDateClick}
                />
            </Box>
        )
    }

    // カレンダー内に表示する内容
    function renderEventContent(eventInfo: EventContentArg) {
        return (
            <>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }


    // ここから実際に表示する内容
    return (
        <>
            <Box sx={{my: '20px'}}>
                {executeCalendar()}
            </Box>
            {isOpenForm && <InputReserve dateArg={dateArg} />}
            {isOpenConfirm && <ReserveConfirm />}

        </>
    )
}

export default AddCalendar
