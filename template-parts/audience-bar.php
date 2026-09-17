<?php /* Audience jump bar — appears once the hero scrolls away. Copy and field labels are read by audience-menu.ts. */ ?>
<div class="audbar" id="audbar">
	<div class="audbar-in">
		<span class="lbl">Jump to</span>
		<div class="aud-menu to-hire" data-aud-menu>
			<button class="aud-trigger" type="button" aria-expanded="false" aria-controls="aud-panel-hire" aria-haspopup="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 20v-1.6A3.4 3.4 0 0 0 12.6 15H6.4A3.4 3.4 0 0 0 3 18.4V20"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 11l2 2 4-4"/></svg>For Companies<svg class="aud-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
			<div class="aud-panel" id="aud-panel-hire" hidden>
				<form class="aud-form" data-aud-form data-aud-audience="hire" data-aud-results="<?php echo esc_url( hsg_sw_results_url() ); ?>" novalidate>
					<div class="aud-head"><p class="aud-title">Start a search</p><p class="aud-sub" data-aud-sub></p><div class="aud-prog"><i data-aud-bar></i></div><p class="aud-count" data-aud-count></p></div>
					<div class="aud-step" data-aud-step="1" data-aud-copy="Tell us about the role — three quick steps.">
						<?php /* Role selector (design 2026-09-18, relaxed here): the ten HSG role groups are suggestions. Pick one → role = its key. Type anything else → role = "custom", title = the text. */ ?>
						<div class="aud-field"><span class="aud-lbl" id="aud-role-lbl">Role / Position</span>
							<div class="aud-combo" data-role-combo>
								<input type="text" class="aud-combo-input" data-role-input id="aud-role-input" role="combobox" aria-expanded="false" aria-controls="aud-role-list" aria-autocomplete="list" aria-labelledby="aud-role-lbl" placeholder="Type a role — e.g. CFO, Plant Manager" autocomplete="off">
								<svg class="aud-combo-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
								<input type="hidden" name="role" data-role-value><input type="hidden" name="title" data-role-title data-optional data-recap-skip>
								<ul class="aud-combo-list" id="aud-role-list" role="listbox" aria-labelledby="aud-role-lbl" hidden data-role-list>
									<?php foreach ( hsg_role_groups() as $key => $g ) { printf( '<li role="option" aria-selected="false" id="aud-role-%1$s" data-value="%1$s" data-search="%2$s" class="aud-combo-opt">%3$s</li>', esc_attr( $key ), esc_attr( hsg_role_search( $g ) ), esc_html( $g['label'] ) ); } ?>
									<li class="aud-combo-empty" data-role-empty hidden>No preset for that — we’ll build the search around “<b data-role-typed></b>”.</li>
								</ul>
							</div>
						</div>
						<label class="aud-field"><span class="aud-lbl">Location</span><input type="text" name="location" placeholder="City, State" maxlength="60" autocomplete="off"></label>
						<label class="aud-field"><span class="aud-lbl">Years of experience</span><select name="experience"><option value="">Select a range</option><option>5–8 Years</option><option>8–12 Years</option><option>12–15 Years</option><option>15–20 Years</option><option>20+ Years</option><option>Flexible / Not Sure</option></select></label>
					</div>
					<div class="aud-step" data-aud-step="2" data-aud-copy="Now the shape of the search." hidden>
						<fieldset class="aud-field"><legend class="aud-lbl">New or replacement?</legend><div class="aud-seg"><label><input type="radio" name="position" value="New Role"><span>New Role</span></label><label><input type="radio" name="position" value="Replacement"><span>Replacement</span></label></div></fieldset>
						<fieldset class="aud-field"><legend class="aud-lbl">Is there a career path?</legend><div class="aud-seg"><label><input type="radio" name="career_path" value="Yes"><span>Yes</span></label><label><input type="radio" name="career_path" value="No"><span>No</span></label><label><input type="radio" name="career_path" value="Not Sure"><span>Not Sure</span></label></div></fieldset>
						<label class="aud-field"><span class="aud-lbl">Salary range <span class="aud-opt">(optional)</span></span><input type="text" name="salary" placeholder="e.g. $175K – $225K" maxlength="40" autocomplete="off" data-optional></label>
					</div>
										<div class="aud-step" data-aud-step="3" data-aud-copy="Last step — how do we reach you?" hidden>
						<label class="aud-field"><span class="aud-lbl">Your name</span><input type="text" name="name" placeholder="First and last name" maxlength="120" autocomplete="name"></label>
						<label class="aud-field"><span class="aud-lbl">Company</span><input type="text" name="company" placeholder="Company name" maxlength="120" autocomplete="organization"></label>
						<label class="aud-field"><span class="aud-lbl">Work email</span><input type="email" name="email" placeholder="you@company.com" maxlength="190" autocomplete="email"></label>
						<label class="aud-field"><span class="aud-lbl">Phone <span class="aud-opt">(optional)</span></span><input type="tel" name="phone" placeholder="(973) 000-0000" maxlength="40" autocomplete="tel" data-optional></label>
						<label class="aud-hp" aria-hidden="true"><input type="text" name="website" tabindex="-1" autocomplete="off"></label>
					</div>
					<div class="aud-step aud-done" data-aud-step="4" hidden><span class="aud-check" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><p class="aud-done-t">Thanks — that is enough to start.</p><p class="aud-done-s">A recruiter will reply to you within one business day.</p><dl class="aud-recap" data-aud-recap></dl></div>
					<p class="aud-err" data-aud-err role="alert" hidden></p>
					<div class="aud-actions"><button type="button" class="btn btn--ghost aud-btn" data-aud-back hidden>Back</button><button type="button" class="btn aud-btn" data-aud-next>Next <span class="arrow" aria-hidden="true">→</span></button><button type="submit" class="btn aud-btn" data-aud-send hidden>Send to HSG <span class="arrow" aria-hidden="true">→</span></button></div>
					<p class="aud-consent">By sending, you agree that HSG may contact you about this search. Nothing is shared with third parties.</p><div hidden></div>
					<a class="aud-jump" href="#hiring" data-aud-jump>Or explore Hiring Solutions →</a>
				</form>
			</div>
		</div>
		<div class="aud-menu aud-menu--right to-career" data-aud-menu>
			<button class="aud-trigger" type="button" aria-expanded="false" aria-controls="aud-panel-career" aria-haspopup="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l5.5-5.5 3.5 3.5L21 6"/><path d="M15.5 6H21v5.5"/><path d="M3 21h18"/></svg>For Professionals<svg class="aud-chev" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
			<div class="aud-panel" id="aud-panel-career" hidden>
				<form class="aud-form" data-aud-form data-aud-audience="career" novalidate>
					<div class="aud-head"><p class="aud-title">Explore your next move</p><p class="aud-sub" data-aud-sub></p><div class="aud-prog"><i data-aud-bar></i></div><p class="aud-count" data-aud-count></p></div>
					<div class="aud-step" data-aud-step="1" data-aud-copy="Tell us what you’re looking for — three quick steps.">
						<label class="aud-field"><span class="aud-lbl">Current or most recent title</span><input type="text" name="title" placeholder="e.g. Director of Operations" maxlength="60" autocomplete="off"></label>
						<label class="aud-field"><span class="aud-lbl">Preferred location</span><input type="text" name="location" placeholder="City, State or Remote" maxlength="60" autocomplete="off"></label>
						<label class="aud-field"><span class="aud-lbl">Years of experience</span><select name="years"><option value="">Select a range</option><option>0–2 years</option><option>3–5 years</option><option>6–10 years</option><option>10+ years</option></select></label>
					</div>
					<div class="aud-step" data-aud-step="2" data-aud-copy="Help us understand where you want to go next." hidden>
						<fieldset class="aud-field"><legend class="aud-lbl">What are you looking for?</legend><div class="aud-seg"><label><input type="radio" name="looking" value="New opportunity"><span>New opportunity</span></label><label><input type="radio" name="looking" value="Career change"><span>Career change</span></label><label><input type="radio" name="looking" value="Not sure yet"><span>Not sure yet</span></label></div></fieldset>
						<fieldset class="aud-field"><legend class="aud-lbl">What level are you targeting?</legend><div class="aud-seg"><label><input type="radio" name="level" value="Manager"><span>Manager</span></label><label><input type="radio" name="level" value="Director"><span>Director</span></label><label><input type="radio" name="level" value="VP"><span>VP</span></label><label><input type="radio" name="level" value="C-Suite"><span>C-Suite</span></label><label><input type="radio" name="level" value="Other"><span>Other</span></label></div></fieldset>
						<label class="aud-field"><span class="aud-lbl">Desired salary range <span class="aud-opt">(optional)</span></span><input type="text" name="salary" placeholder="e.g. $120K – $150K" maxlength="40" autocomplete="off" data-optional></label>
					</div>
										<div class="aud-step" data-aud-step="3" data-aud-copy="Last step — how do we reach you? Everything stays confidential." hidden>
						<label class="aud-field"><span class="aud-lbl">Your name</span><input type="text" name="name" placeholder="First and last name" maxlength="120" autocomplete="name"></label>
						<label class="aud-field"><span class="aud-lbl">Email</span><input type="email" name="email" placeholder="you@example.com" maxlength="190" autocomplete="email"></label>
						<label class="aud-field"><span class="aud-lbl">Phone <span class="aud-opt">(optional)</span></span><input type="tel" name="phone" placeholder="(973) 000-0000" maxlength="40" autocomplete="tel" data-optional></label>
						<label class="aud-hp" aria-hidden="true"><input type="text" name="website" tabindex="-1" autocomplete="off"></label>
					</div>
					<div class="aud-step aud-done" data-aud-step="4" hidden><span class="aud-check" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><p class="aud-done-t">Thanks — that is enough to start.</p><p class="aud-done-s">An advisor will reply to you within one business day.</p><dl class="aud-recap" data-aud-recap></dl></div>
					<p class="aud-err" data-aud-err role="alert" hidden></p>
					<div class="aud-actions"><button type="button" class="btn btn--ghost aud-btn" data-aud-back hidden>Back</button><button type="button" class="btn aud-btn" data-aud-next>Next <span class="arrow" aria-hidden="true">→</span></button><button type="submit" class="btn aud-btn" data-aud-send hidden>Connect with HSG</button></div>
					<p class="aud-consent">By sending, you agree that HSG may contact you about your next move. Confidential — never shared.</p><div hidden></div>
					<a class="aud-jump" href="#career" data-aud-jump>Or explore Career Solutions →</a>
				</form>
			</div>
		</div>
	</div>
</div>
