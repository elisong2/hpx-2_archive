// import { login, signup } from "../actions";
import { signup } from "@/utils/auth-actions";

export default function SignupPage() {
  return (
    <form className="card bg-base-100 w-96 shadow-sm">
      {/* <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required /> */}

      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </g>
        </svg>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="mail@site.com"
          required
        />
      </label>
      <div className="validator-hint hidden">Enter valid email address</div>

      {/* <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required /> */}

      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          // minLength="8"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
        />
      </label>
      <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p>

      {/* <label htmlFor="username">Username:</label>
      <input id="username" name="username" type="username" required /> */}
      {/* <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          id="username"
          name="username"
          type="text"
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          // minLength="3"
          // maxlength="30"
          title="Only letters, numbers or dash"
        />
      </label>
      <p className="validator-hint">
        Must be 3 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p> */}

      {/* <fieldset className="fieldset">
        <legend className="fieldset-legend">Tell us about you!</legend>
        <textarea
          className="textarea h-24"
          id="bio"
          name="bio"
          placeholder="bio"
        ></textarea>
        <div className="label">Optional</div>
      </fieldset> */}

      <button className="btn" formAction={signup}>
        Sign Up
      </button>
    </form>
  );
}
