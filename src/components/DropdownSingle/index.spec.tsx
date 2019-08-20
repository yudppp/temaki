import * as Enzyme from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { mountWithTheme } from '~/__test__/utils'
import * as DropdownSingle from './index'
import 'jest-styled-components'

describe('Dropdown(Single)コンポーネントのテスト', () => {
    let wrapper: Enzyme.ReactWrapper
    let mockOnClickItem: jest.Mock
    let items: DropdownSingle.Item[]

    beforeEach(() => {
        mockOnClickItem = jest.fn()
        items = [
            { text: 'りんご' },
            { text: 'いちご' },
            { text: 'バナナ' },
            { text: 'メロン' },
            { text: 'さくらんぼ' },
            { text: 'ぶどう' }
        ]
        act(() => {
            wrapper = mountWithTheme(
                <DropdownSingle.Component
                    placeholder="placeholder"
                    items={items}
                    selected=""
                    isError={false}
                    width={200}
                    onClickItem={mockOnClickItem}
                />
            )
        })
    })

    it('コンポーネントが定義されている', () => {
        expect(wrapper).toBeDefined()
    })

    it('StateのisVisibleによってul要素が見え隠れする', () => {
        expect(wrapper.find('ul[data-test="ul"].hide')).toHaveLength(1)
        wrapper.find('div[data-test="body"]').simulate('click')
        expect(wrapper.find('ul[data-test="ul"].hide')).toHaveLength(0)

        const ulEl = wrapper.find('ul[data-test="ul"]')
        expect(ulEl).toHaveStyleRule('visibility', 'visible')
        expect(ulEl).toHaveStyleRule('visibility', 'hidden', {
            modifier: '&.hide'
        })
    })

    it('StateのisVisibleがtrueの時、borderが緑になっている', () => {
        wrapper.find('div[data-test="body"]').simulate('click')
        expect(wrapper.find('div[data-test="body"]')).toHaveStyleRule(
            'border',
            '1px solid rgb(114,206,92)'
        )
    })

    it('エラー時にborderが赤になっている', () => {
        wrapper = mountWithTheme(
            <DropdownSingle.Component
                placeholder="placeholder"
                items={items}
                selected=""
                isError={true}
                width={200}
                onClickItem={mockOnClickItem}
            />
        )
        expect(wrapper.find('div[data-test="body"]')).toHaveStyleRule(
            'border',
            '1px solid rgb(224,85,72)'
        )
    })

    it('リストが選択されていない時に、placeholderが本体に表示されている', () => {
        wrapper = mountWithTheme(
            <DropdownSingle.Component
                placeholder="placeholder"
                items={items}
                selected=""
                isError={true}
                width={200}
                onClickItem={mockOnClickItem}
            />
        )
        expect(wrapper.find('div[data-test="placeholder"]')).toHaveLength(1)
        expect(wrapper.find('div[data-test="selected"]')).toHaveLength(0)
    })

    it('選択されたリストがある時に、本体に表示されている', () => {
        wrapper = mountWithTheme(
            <DropdownSingle.Component
                placeholder="placeholder"
                items={items}
                selected="りんご"
                isError={true}
                width={200}
                onClickItem={mockOnClickItem}
            />
        )
        expect(wrapper.find('div[data-test="placeholder"]')).toHaveLength(0)
        expect(wrapper.find('div[data-test="selected"]')).toHaveLength(1)
    })

    it('選択されたリストがある時に、チェックが入っている', () => {
        wrapper = mountWithTheme(
            <DropdownSingle.Component
                placeholder="placeholder"
                items={items}
                selected="りんご"
                isError={true}
                width={200}
                onClickItem={mockOnClickItem}
            />
        )
        expect(
            wrapper
                .find('ul[data-test="ul"]')
                .children()
                .first()
                .find('div')
                .first()
        ).toHaveStyleRule('fill', 'rgb(51,51,51)', {
            modifier: '& #fill'
        })
    })

    it('ドロップダウンの中身がクリックされた時にonClickItemが呼ばれる', () => {
        act(() => {
            wrapper.find('div[data-test="body"]').simulate('click')
            wrapper
                .find('li')
                .first()
                .simulate('click')
            expect(mockOnClickItem).toHaveBeenCalled()
        })
    })
})