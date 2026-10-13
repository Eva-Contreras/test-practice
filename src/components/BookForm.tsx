import type { RefObject } from "react"

type BookFormProps = {
  formState: { message: string }
  isPending: boolean
  submitBook: (formData: FormData) => void
  titleInputRef: RefObject<HTMLInputElement | null>
}

export function BookForm({formState, isPending, submitBook, titleInputRef}: BookFormProps) {
  return (
    <form className="book-form" action={submitBook}>
      <div className="book-form__intro">
        <h2>New book</h2>
        <p>Complete the fields to add a book to the reading list.</p>
      </div>

      <div className="book-form__fields">
        <div className="field">
          <label htmlFor="book-title">Title</label>
          <input
            ref={titleInputRef}
            id="book-title"
            name="title"
            type="text"
            placeholder="Write title here"
          />
        </div>

        <div className="field">
          <label htmlFor="book-author">Author</label>
          <input
            id="book-author"
            name="author"
            type="text"
            placeholder="Write author here"
          />
        </div>

        <div className="field">
          <label htmlFor="book-pages">Pages</label>
          <input
            id="book-pages"
            name="pages"
            type="number"
            min="1"
            step="1"
            placeholder="Write pages here"
          />
        </div>
      </div>

      {formState.message && <p role="status">{formState.message}</p>}

      <button className="button" type="submit" disabled={isPending}>
        {isPending ? 'Adding book...' : 'Add book'}
      </button>
    </form>
  )
}
