import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useParams } from 'next/navigation';
import type { User } from 'firebase/auth';
import { GameContentsModel, type GameContentsType } from '@/types/GameContents';
import { PracticeContentsModel, type PracticeContentsType } from '@/types/PracticeContents';

