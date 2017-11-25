module.exports = { 
    uuid: '00eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'helloworld',
    poems: [
        {
            uuid: '10eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            title: 'Poem 1',
            collection_name: 'helloworld',
            date_written: '11/25/17',
            lines: [
                    { uuid: '20eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line 1',
                      line_number: 1,
                      poem_title: 'Poem 1'
                    },
                    { uuid: '30eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line 2',
                      line_number: 2,
                      poem_title: 'Poem 1'
                    },
                    { uuid: '40eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line 3',
                      line_number: 3,
                      poem_title: 'Poem 1'
                    }]
        },
        {
            uuid: '50eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            title: 'Poem 2',
            collection_name: 'helloworld',
            lines: [
                    { uuid: '60eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line A',
                      line_number: 1,
                      poem_title: 'Poem 2'
                    },
                    { uuid: '70eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line B',
                      line_number: 2,
                      poem_title: 'Poem 2'
                    },
                    { uuid: '80eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
                      content: 'Line C',
                      line_number: 3,
                      poem_title: 'Poem 2'
                    }]
        }
    ]
}
