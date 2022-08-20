const state = () => {
    return {
            container: {
                borderRadius: '20px 10px 50px 0',
                border: '1px solid #ddd',
                boxShadow: '0 20px 30px 10px',
                boxShadowColor: '#000',
                boxShadowAlpha: 0.05,
                padding: '20px',
                width: '450px',// 'auto'
            },
            title: {
                fontSize: '24px',
                padding: '20px',
                color: '#000',
                background: "#fff",
                borderBottom: '1px solid #ddd'
            },
            text: {
                color: '#000',
                fontSize: '16px',
                background: '#fff',
            },
            labels: {
                'title': 'Запазване на час',
                'date': 'Изберете дата',
                'service': 'Изберете услуга',
                'employee': 'Изберете при кого искате да запазите час',
                'phone': 'Въведете Телефон',
                'email': 'Въведете Емайл',
                'forward': 'Напред',
                'backward': 'Назад',
                'send': 'Изпрати'
            },
            steps: [
                {
                    fields: ['date'], uuid: 0
                },
                // {
                //     fields: ['service'], uuid: 1
                // },
                // {
                //     fields: ['employee'], uuid: 2
                // },
                // {
                //     fields: ['phone', 'email'], uuid: 3
                // },
                // {
                //     fields: ['custom'],
                //     uuid: 4,
                //     questions: [
                //         { text: 'На колко сте години', type: 'integer', min: 0, max: 99 },
                //         { text: 'Защо избрахте нашите услуги', type: 'text' },
                //     ]
                // }
            ],
            success: {
                text: 'Успешно запазихте час!',
                description: '',
                button: 'Готово'
            }
        };
}

export default state;