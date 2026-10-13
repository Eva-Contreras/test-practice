import { useActionState, useRef, useState } from "react"
import { initialBooks } from "../data/initialBooks"

type FormState = {
  message: string
}

export function useReadingList() {
  const [books, setBooks] = useState(initialBooks)
  const titleInputRef = useRef<HTMLInputElement>(null)

  function focusTitleInput() {
    titleInputRef.current?.focus()
  }

  async function addBook(_previousState: FormState,formData: FormData,): Promise<FormState> {
    const title = formData.get("title")?.toString().trim() ?? ""
    const author = formData.get("author")?.toString().trim() ?? ""
    const pagesText = formData.get("pages")?.toString().trim() ?? ""
    const pages = Number(pagesText)

    await new Promise((resolve) => setTimeout(resolve, 300))

    const validationError = [
      { isInvalid: !title, message: "Please enter a book title." },
      { isInvalid: !author, message: "Please enter the author's name." },
      {
        isInvalid: !pagesText || !Number.isInteger(pages) || pages <= 0,
        message: "Pages must be a whole number greater than 0.",
      },
    ].find((rule) => rule.isInvalid)?.message

    const message =
      validationError ?? `"${title}" added to your reading list.`

    if (!validationError) {
      setBooks((currentBooks) => [
        ...currentBooks,
        {
          id: Math.max(0, ...currentBooks.map((book) => book.id)) + 1,
          title,
          author,
          pages,
        },
      ])
    }

    focusTitleInput()
    return { message }
  }

  const [formState, submitBook, isPending] = useActionState(addBook, {
    message: "",
  })

  return {
    books,
    formState,
    submitBook,
    isPending,
    titleInputRef,
  }
}