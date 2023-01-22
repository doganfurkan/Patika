import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import emojilist from "./emojiList.json";

describe("Emoji Test",() => {
  beforeEach(()=> {
    render(<App/>)
  })

  test("Header Test", () => {
    const header = screen.getByText("Emoji Search");
    expect(header).toBeInTheDocument();
  })

  test("Emoji List Test",()=> {
    emojilist.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    })
  })

  test("Filter Test", () => {
    const input = screen.getByRole("textbox");
    const myFilter = "grimacing";
    fireEvent.change(input, { target: { value: myFilter } });
    expect(screen.getAllByText(/grimacing/i)).toHaveLength(1);
  })
  test('proof that after click emoji, copy', async () => {
    const click = screen.getByText("100");
    expect(click.parentElement.getAttribute("data-clipboard-text").length).toBeGreaterThan(0);
    console.log(click.parentElement.getAttribute("data-clipboard-text"));
    expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch("💯");
  });
})