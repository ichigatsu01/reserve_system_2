import FullCalendar from '@fullcalendar/react';
import { Box } from '@mui/material';
import type { DateClickArg, EventContentArg } from 'fullcalendar/index.js';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useContext, useEffect, useState } from 'react';
import { InputContext } from '../providers/ReserveProvider';
import InputReserve from './InputReserve/InputReserve';
import ReserveConfirm from './InputReserve/ReserveConfirm';
import { loadPatient } from '../firebase/LoadReservePatient';

//* memo:
//* EventContentArg ... イベントの内容を表示するための型
//* DateClickArg ... 日付をクリックしたときの情報

type eventType = {
    daysOfWeek?: number[],
    display?: string,
    color?: string,
    startTime?: string,
    endTime?: string,
    title?: string,
    start?: string,
    end?: string
}

// Firestore由来のイベントを取得するための型。まず中身の型を設定する
type addEventsType = {
    title: string,
    start: string,
    end: string
}
// addEventsには複数日時の予約が入るため、配列であることを明示
type addEventsArrayType = addEventsType[];

const AddCalendar = () => {
    const { isOpenForm, setIsOpenForm, isOpenConfirm } = useContext(InputContext)

    // !InputReserveに渡すargの獲得
    const [ dateArg, setDateArg ] = useState<DateClickArg | null>(null)

    // カレンダーに表示するイベント
    const [ allEvents, setAllEvents ] = useState<eventType[]>([
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
        { title: 'ダミー', start: '2025-06-04T13:00:00', end: '2025-06-04T13:30:00', color: 'red' }
    ])

    //* Firestoreからのイベント取得用。後に追加する予定の病院休業日など、管理側のイベントも追加できるようにするか要検討
    const [ addEvents, setAddEvents ] = useState<addEventsArrayType>([])

    // 患者予約取得
    useEffect(() => {
        const fetchData = async() => {
            const result = await loadPatient();
            if (result) {
                setAddEvents(result);
            }
        };
        fetchData();
    }, [])



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
                    events={allEvents} // カレンダー内に表示するイベント
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
