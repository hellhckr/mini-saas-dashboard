CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'on hold', 'completed')),
  deadline DATE NOT NULL,
  assigned_team_member TEXT NOT NULL,
  budget DECIMAL(12, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Essential RLS setup
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated read" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON projects FOR DELETE USING (auth.role() = 'authenticated');