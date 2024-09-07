import { PageLayout } from '@/components/PageLayout';
import './Init.scss';
import CustomHeader from '@/components/CustomHeader';
import useAppNavigate from '@/hooks/useAppNavigate';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { INIT_STEP_1, INIT_STEP_3, INIT_STEP_4, INIT_STEP_HEADER_TEXT } from '@/constants/init.data';
import Check from '@/assets/img/icon_check.svg?react';
import cn from 'classnames';
import Button from '@/components/atom/Button';
import { Plus } from 'lucide-react';
import useIsAble from '@/hooks/useIsAble';
import { ScrollArea } from '@/components/ScrollArea';
import CheckWave from '@/components/atom/CheckWave';

type Interest = 'MUSIC' | 'VISUAL' | 'WRITING';
type UserRole = 'ARTIST' | 'ARTTY';

type InitProfile = {
  role: UserRole | null;
  profileImage: File | null;
  interest: Array<Interest>;
  keywords: Record<Interest, Array<string>> | null;
}

const Init = () => {
  const navigate = useAppNavigate();
  const [step, setStep] = useState<number>(0);
  const [profile, setProfile] = useState<InitProfile>({
    role        : null,
    profileImage: null,
    interest    : [],
    keywords    : null,
  });

  const stepRenderer = useMemo(() => {
    switch (step) {
      case 0:
        return <InitStep1 setStep={setStep} profile={profile} setProfile={setProfile} />;
      case 1:
        return <InitStep2 setStep={setStep} profile={profile} setProfile={setProfile} />;
      case 2:
        return <InitStep3 setStep={setStep} profile={profile} setProfile={setProfile} />;
      case 3:
        return <InitStep4 setStep={setStep} profile={profile} setProfile={setProfile} />;
      default:
        return <></>;
    }
  }, [profile, step]);
  return (
    <PageLayout flexDirection={'column'}>
      {step === 4 && <InitComplete/>}
      {step !== 4 &&
        <div id={'Init'}>
          <CustomHeader leftOnClick={() => navigate(-1)}>
            <progress value={(step + 1) / 4} className='init-progress' />
          </CustomHeader>
          <div className='init-header'>
          <span className='init-header-title'>
            {INIT_STEP_HEADER_TEXT[step].title}
          </span>
            {INIT_STEP_HEADER_TEXT[step].subTitle}
          </div>
          {stepRenderer}
        </div>
      }
    </PageLayout>
  );
};

export default Init;

type InitStepProps = {
  setStep: Dispatch<SetStateAction<number>>
  profile: InitProfile;
  setProfile: Dispatch<SetStateAction<InitProfile>>
}

const InitStep1 = (props: InitStepProps) => {
  const { profile, setProfile, setStep } = props;
  const isChecked = (el: UserRole) => {
    return el === profile.role;
  };

  const selectRole = (el: UserRole) => {
    setProfile(prev => {
      return {
        ...prev,
        role: el,
      };
    });
  };

  const isAbleToNext = useIsAble([
    profile.role !== null,
  ]);

  return (
    <div className='init-step-1'>
      <div className='init-step-1-role-wrapper'>
        {INIT_STEP_1.map(el =>
          <div className={cn('init-step-1-role', { check: isChecked(el.id as UserRole) })}
               onClick={() => selectRole(el.id as UserRole)}>
            <div className={cn('init-step-1-role-check', { check: isChecked(el.id as UserRole) })}>
              <Check fill={isChecked(el.id as UserRole) ? '#000000' : '#212121'} width={11} height={8} />
            </div>
            <div className='init-step-1-role-content'>
              <div className='init-step-1-role-content-title'>
              <span className={cn('init-step-1-role-content-title-name', { check: isChecked(el.id as UserRole) })}>
                {`${el.label.emoji} ${el.label.name} `}
                <span
                  className={cn('init-step-1-role-content-title-sub-name', { check: isChecked(el.id as UserRole) })}>{`(${el.label.subName})`}</span>
              </span>
              </div>
              <span className={cn('init-step-1-role-content-description', { check: isChecked(el.id as UserRole) })}>
              {el.description}
            </span>
            </div>
          </div>,
        )}
      </div>
      <div className='init-button-wrapper'>
        <Button onClick={() => setStep(prev => prev + 1)} disabled={!isAbleToNext}>
          다음
        </Button>
      </div>
    </div>
  );
};

const InitStep2 = (props: InitStepProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { profile, setProfile, setStep } = props;

  const preview = useMemo(() => {
    if(profile.profileImage === null) {
      return null;
    }
    return URL.createObjectURL(profile.profileImage);
  }, [profile.profileImage]);

  const isAbleToNext = useIsAble([
    profile.profileImage !== null,
  ]);

  const onClickProfileSelect = () => {
    if(ref && ref.current) {
      ref.current?.click();
    }
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    const file = e.target.files[0];
    setProfile(prev => {
      return {
        ...prev,
        profileImage: file,
      };
    });
  };

  return (
    <div className='init-step-2'>
      <div className='init-step-2-profile-wrapper'>
        <input ref={ref} type='file' accept={'image/*'} onChange={(e) => onFileSelect(e)} />
        <div onClick={() => onClickProfileSelect()} className='init-step-2-profile'>
          {(profile.profileImage && preview) && <img src={preview} alt='preview' />}
          {!profile.profileImage && <span>등록하기</span>}
          {!profile.profileImage &&
            <div className='init-profile-add'><Plus color={'#ffffff'} strokeLinecap={'square'} strokeWidth={3} /></div>}
        </div>
      </div>
      <div className='init-button-wrapper'>
        <Button onClick={() => setStep(prev => prev + 1)} disabled={!isAbleToNext}>
          다음
        </Button>
      </div>
    </div>
  );
};


const InitStep3 = (props: InitStepProps) => {
  const { profile, setProfile, setStep } = props;
  const isAbleToNext = useIsAble([
    profile.interest.length > 0,
  ]);

  const isSelectedInterest = useCallback((el: Interest) => {
    return profile.interest.includes(el);
  }, [profile]);

  const onSelectInterest = useCallback((el: Interest) => {
    if(profile.interest.includes(el)) {
      setProfile(prev => {
        return {
          ...prev,
          interest: prev.interest.filter(interest => interest !== el).sort(),
        };
      });
      return;
    }
    setProfile(prev => {
      return {
        ...prev,
        interest: prev.interest.concat(el).sort(),
      };
    });
  }, [profile]);

  const onClickNext = () => {
    let keywords = {} as Record<Interest, Array<string>>;
    for (const interest of profile.interest) {
      keywords = {
        ...keywords,
        [interest]: [],
      };
    }
    setProfile(prev => {
      return {
        ...prev,
        keywords: keywords,
      };
    });
    setStep(prev => prev + 1);
  };

  return (
    <div className='init-step-3'>
      <div className='init-step-3-interest-list'>
        {INIT_STEP_3.map(el => {
          const Icon = el.icon;
          return (
            <div onClick={() => onSelectInterest(el.name as Interest)}
                 style={{ borderColor: isSelectedInterest(el.name as Interest) ? el.color : '#212121' }}
                 className='init-step-3-interest'>
              <div className='init-step-3-interest-content'>
                <Icon />
                <div className='init-step-3-interest-info'>
                  <span className='init-step-3-interest-info-name' style={{ color: el.color }}>{el.name}</span>
                  <span className='init-step-3-interest-info-description'>{el.description}</span>
                </div>
              </div>
              <Check fill={isSelectedInterest(el.name as Interest) ? el.color : '#212121'} width={19} height={14} />
            </div>
          );
        })}
      </div>
      <div className='init-button-wrapper'>
        <Button onClick={() => onClickNext()} disabled={!isAbleToNext}>
          다음
        </Button>
      </div>
    </div>
  );
};


const InitStep4 = (props: InitStepProps) => {
  const { profile, setProfile, setStep } = props;
  // console.log(profile);
  const isAbleToNext = useIsAble([
    (profile.keywords !== null &&
      Object.values(profile.keywords)
            .reduce((acc, cur) => cur.length >= 2 && acc, true)),
  ]);
  const isSelected = useCallback((name: Interest, keyword: string) => {
    if(!profile.keywords) {
      return false;
    }
    const target = profile.keywords[name];
    return target.includes(keyword);
  }, [profile.keywords]);

  const onSelectKeyword = (name: Interest, keyword: string) => {
    if(!profile.keywords) return;
    if(!Object.keys(profile.keywords).includes(name)) return;
    const currentKeywords = profile.keywords[name];
    if(currentKeywords.includes(keyword)) {
      setProfile(prev => {
        return {
          ...prev,
          keywords: {
            ...prev.keywords as Record<Interest, Array<string>>,
            [name]: currentKeywords.filter(el => el !== keyword),
          },
        };
      });
      return;

    }
    setProfile(prev => {
      return {
        ...prev,
        keywords: {
          ...prev.keywords as Record<Interest, Array<string>>,
          [name]: currentKeywords.concat(keyword),
        },
      };
    });

  };


  const onClickComplete = () => {
    setStep(prev => prev + 1);
  };


  return (
    <div className='init-step-4'>
      <ScrollArea>
        <div className='init-step-4-container'>
          {profile.interest.map(el => {
            const payload = INIT_STEP_4[el];
            const Icon = payload.icon;
            console.log(payload);
            return (
              <div className='keyword-wrapper'>
                <div className='keyword-label' style={{ border: `1px solid ${payload.color}` }}>
                  <Icon height={14} />
                  <span style={{ color: payload.color }}>{payload.name}</span>
                </div>
                <div className='keyword-list'>
                  {payload.keywords.map(keyword =>
                    <div className='keyword'
                         onClick={() => onSelectKeyword(payload.name as Interest, keyword)}
                         style={{
                           backgroundColor: isSelected(el, keyword) ? payload.color : '#212121',
                           color          : isSelected(el, keyword) ? '#000000' : '#ffffff',
                         }}>
                      <span>{keyword}</span>
                    </div>,
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className='init-button-wrapper'>
        <Button onClick={() => onClickComplete()} disabled={!isAbleToNext}>
          다음
        </Button>
      </div>
    </div>
  );
};

const InitComplete = () => {
  const navigate = useAppNavigate();
  return (
    <div className='init-complete'>
      <div className='init-complete-wrapper'>
        <div className='init-complete-view'>
          <CheckWave/>
          <div className='init-complete-view-text'>
            <span className='init-complete-view-main'>설정이 완료되었습니다!</span>
            <span className='init-complete-view-sub'>PROM에서 자신의 매력을 뽐내보세요.</span>
          </div>

        </div>
      </div>

      <div className='init-button-wrapper'>
        <Button onClick={() => navigate('home')}>
          시작하기
        </Button>
      </div>
    </div>
  )
}
