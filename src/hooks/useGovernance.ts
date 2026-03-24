import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import type { Constitution, GovernanceDocument, Notepad } from '../types/entities';

export function useConstitution(projectId: string | undefined) {
  const { dataSource } = useData();
  const [constitution, setConstitution] = useState<Constitution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || !dataSource) {
      setConstitution(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    dataSource.getConstitution(projectId)
      .then((result) => {
        if (!cancelled) {
          setConstitution(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [projectId, dataSource]);

  return { constitution, isLoading, error };
}

export function useGovernanceDocuments(projectId: string | undefined) {
  const { dataSource } = useData();
  const [documents, setDocuments] = useState<GovernanceDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || !dataSource) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    dataSource.getGovernanceDocuments(projectId)
      .then((result) => {
        if (!cancelled) {
          setDocuments(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [projectId, dataSource]);

  return { documents, isLoading, error };
}

export function useGovernanceDocument(projectId: string | undefined, documentId: string | undefined) {
  const { dataSource } = useData();
  const [document, setDocument] = useState<GovernanceDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || !documentId || !dataSource) {
      setDocument(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    dataSource.inspectGovernanceDocument(projectId, documentId)
      .then((result) => {
        if (!cancelled) {
          setDocument(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [projectId, documentId, dataSource]);

  return { document, isLoading, error };
}

export function useProjectNotepad(projectId: string | undefined) {
  const { dataSource } = useData();
  const [notepad, setNotepad] = useState<Notepad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId || !dataSource) {
      setNotepad(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    dataSource.getProjectNotepad(projectId)
      .then((result) => {
        if (!cancelled) {
          setNotepad(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [projectId, dataSource]);

  return { notepad, isLoading, error };
}

export function useGlobalNotepad() {
  const { dataSource } = useData();
  const [notepad, setNotepad] = useState<Notepad | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!dataSource) {
      setNotepad(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    dataSource.getGlobalNotepad()
      .then((result) => {
        if (!cancelled) {
          setNotepad(result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dataSource]);

  return { notepad, isLoading, error };
}
