import {
  User,
  Shield,
  BookOpen,
  Sparkles,
  Database,
  History,
} from 'lucide-react';
import { formatINR } from '../lib/formulas';
import { resolveRuleProfile } from '../lib/ruleProfiles';
import ProfileSection from './ProfileSection';
import RuleProfilePanel from './RuleProfilePanel';
import CsvImportPanel from './CsvImportPanel';
import SessionReviewPanel from './SessionReviewPanel';
import LevelHistory from './LevelHistory';
import MigrationStatusPanel from './MigrationStatusPanel';

export default function ProfilePage({
  session,
  account,
  level,
  capital,
  ruleProfileId,
  levelHistory,
  tradeLoggingBlocked,
  onProfileChanged,
  onTradeLogged,
}) {
  const email = session?.user?.email ?? 'trader';
  const profile = resolveRuleProfile(ruleProfileId);
  const memberSince = session?.user?.created_at
    ? new Date(session.user.created_at).toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric',
      })
    : null;

  return (
    <div className="mt-6 max-w-3xl mx-auto flex flex-col gap-6 min-w-0">
      <ProfileSection
        id="profile-account"
        title="Account"
        description="Your Cyber-Grid identity and live progression snapshot."
        icon={User}
      >
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-slate-500 text-xs">Email</dt>
            <dd className="font-mono text-slate-200 truncate">{email}</dd>
          </div>
          {memberSince ? (
            <div>
              <dt className="text-slate-500 text-xs">Member since</dt>
              <dd className="text-slate-200">{memberSince}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-slate-500 text-xs">Level</dt>
            <dd className="font-mono cyber-metric text-cyan-300">{level} / 42</dd>
          </div>
          <div>
            <dt className="text-slate-500 text-xs">Capital</dt>
            <dd className="font-mono cyber-metric text-emerald-400">{formatINR(capital)}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-slate-500 text-xs">Active rule profile</dt>
            <dd className="text-slate-200">{profile.label}</dd>
          </div>
        </dl>
      </ProfileSection>

      <ProfileSection
        id="profile-rules"
        title="Trading rules"
        description="Prop vs Cyber-Grid promotion and drawdown thresholds (F-039)."
        icon={Shield}
      >
        <RuleProfilePanel
          embedded
          accountId={account?.id}
          ruleProfileId={ruleProfileId}
          onProfileChanged={onProfileChanged}
        />
      </ProfileSection>

      <ProfileSection
        id="profile-journal"
        title="Journal & imports"
        description="Bulk CSV import. Cool-down stays on the dashboard next to Log trade."
        icon={BookOpen}
      >
        <p className="text-[10px] text-slate-500 -mt-2">
          Export trades from the dashboard journal. Edit/delete need migration 005.
        </p>
        <CsvImportPanel
          embedded
          onTradeLogged={onTradeLogged}
          tradeLoggingBlocked={tradeLoggingBlocked}
        />
      </ProfileSection>

      <ProfileSection
        id="profile-review"
        title="Session reflection"
        description="End-of-day review (migration 003)."
        icon={Sparkles}
      >
        <SessionReviewPanel embedded userId={session?.user?.id} />
      </ProfileSection>

      <ProfileSection
        id="profile-history"
        title="Level history"
        description="Promotions and demotions from your journal."
        icon={History}
      >
        <LevelHistory embedded entries={levelHistory} />
      </ProfileSection>

      <ProfileSection
        id="profile-database"
        title="Database setup"
        description="Supabase migrations for previews, profiles, reviews, and journal CRUD."
        icon={Database}
      >
        <MigrationStatusPanel />
      </ProfileSection>
    </div>
  );
}
