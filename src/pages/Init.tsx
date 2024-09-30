import { SafeAreaLayout } from '@/components/SafeAreaLayout';
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
import { POST_CATEGORY_DATA, INIT_STEP_3, INIT_STEP_HEADER_TEXT } from '@/constants/init.data';
import Check from '@/assets/img/icon_check.svg?react';
import Button from '@/components/atom/Button';
import { Plus } from 'lucide-react';
import Logo from '@/assets/img/img_logo.svg?react';
import useIsAble from '@/hooks/useIsAble';
import { ScrollArea } from '@/components/ScrollArea';
import CheckWave from '@/components/atom/CheckWave';
import { checkNicknameAPI, logoutAPI, updateUserInfoAPI, updateUserInterestAPI } from '@/feature/api/user.api';
import StepProgress from '@/components/StepProgress';
import userStore from '@/store/User';

type Interest = 'MUSIC' | 'VISUAL' | 'WRITING';

type InitProfile = {
  profileImage: File | null;
  nickname: string;
  interest: Array<Interest>;
  keywords: Record<Interest, Array<string>> | null;
}

const Init = () => {
  const navigate = useAppNavigate();
  const {removeUser} = userStore(state => state);
  const [step, setStep] = useState<number>(0);
  const [profile, setProfile] = useState<InitProfile>({
    nickname    : '',
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
      default:
        return <></>;
    }
  }, [profile, step]);

  const onBack = async() => {
    if(step === 0){
      await logoutAPI();
      removeUser();
      navigate('sign-in')
      return;
    }
    navigate(-1)
  }

  return (
    <SafeAreaLayout flexDirection={'column'}>
      {step === 3 && <InitComplete />}
      {step !== 3 &&
        <div id={'Init'}>
          <CustomHeader leftOnClick={() => onBack()}>
            <StepProgress value={(step + 1) / 3} color={'#7bf7ff'}/>
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
    </SafeAreaLayout>
  );
};

export default Init;

type InitStepProps = {
  setStep: Dispatch<SetStateAction<number>>
  profile: InitProfile;
  setProfile: Dispatch<SetStateAction<InitProfile>>
}

const InitStep1 = (props: InitStepProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { profile, setProfile, setStep } = props;
  // const [checkNickname, setCheckNickname] = useState(false);
  const [isAbleNickname, setIsAbleNickname] = useState(true);

  const preview = useMemo(() => {
    if(profile.profileImage === null) {
      return null;
    }
    return URL.createObjectURL(profile.profileImage);
  }, [profile.profileImage]);

  const isAbleToNext = useIsAble([
    profile.profileImage !== null,
    profile.nickname !== '',
    isAbleNickname,
  ]);

  const onClickProfileSelect = () => {
    if(ref && ref.current) {
      ref.current?.click();
    }
  };

  const setNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => {
      return {
        ...prev,
        nickname: e.target.value,
      };
    });
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

  const onClickNext = async () => {
    try {
      const isDuplicate = await checkNicknameAPI(profile.nickname);
      //TODO: 체크
      if(isDuplicate) {
        setIsAbleNickname(false);
        return;
      }
      setStep(prev => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const nicknameInputBorderStyle = useMemo(() => {
    if(!isAbleNickname) {
      return {
        border: '1px solid #FF6D6D',
      };
    }
    return {
      border: '1px solid #292929',
    };
  }, [isAbleNickname]);

  return (
    <div className='init-step-1'>
      <div className='init-step-1-profile-wrapper'>
        <div className='init-step-1-profile-image'>
          <input ref={ref} type='file' accept={'image/*'} onChange={(e) => onFileSelect(e)} />
          <div onClick={() => onClickProfileSelect()} className='init-step-1-profile'>
            {(profile.profileImage && preview) && <img src={preview} alt='preview' />}
            {!profile.profileImage &&
              <div className='init-profile-preview'>
                <Logo width={70} />
              </div>
            }
            {!profile.profileImage &&
              <div className='init-profile-add'>
                <Plus color={'#ffffff'} strokeLinecap={'square'} strokeWidth={3} />
              </div>}
          </div>
        </div>
        <div className='init-step-1-profile-nickname'>
          <input value={profile.nickname}
                 onFocus={() => setIsAbleNickname(true)}
                 style={{ ...nicknameInputBorderStyle }}
                 onChange={e => setNickname(e)}
                 placeholder={'이름을 입력해주세요.'}
                 maxLength={15}
                 type='text' />
        </div>

      </div>
      <div className='init-button-wrapper'>
        {!isAbleNickname &&
          <span>이미 사용중인 닉네임입니다.</span>
        }
        <Button onClick={() => onClickNext()} disabled={!isAbleToNext}>
          다음
        </Button>
      </div>
    </div>
  );
};


const InitStep2 = (props: InitStepProps) => {
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
    <div className='init-step-2'>
      <div className='init-step-2-interest-list'>
        {POST_CATEGORY_DATA.map(el => {
          const Icon = el.icon;
          return (
            <div onClick={() => onSelectInterest(el.name as Interest)}
                 style={{ borderColor: isSelectedInterest(el.name as Interest) ? el.color : '#212121' }}
                 className='init-step-2-interest'>
              <div className='init-step-2-interest-content'>
                <Icon />
                <div className='init-step-2-interest-info'>
                  <span className='init-step-2-interest-info-name' style={{ color: el.color }}>{el.name}</span>
                  <span className='init-step-2-interest-info-description'>{el.description}</span>
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


const InitStep3 = (props: InitStepProps) => {
  const { profile, setProfile, setStep } = props;
  const {setUser} = userStore(state => state);
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
  console.log(profile.keywords);

  const onClickComplete = async () => {
    if(profile.keywords === null) return;
    try {
      const formData = new FormData();
      formData.append('description', '-');
      formData.append('profileImage', profile.profileImage as Blob);
      formData.append('birthDate', '1999-12-31');
      formData.append('nickname', profile.nickname);
      formData.append('phoneNumber', '010-0000-0000');
      formData.append('role', 'ROLE_ARTIST');
      const updatedResult = await updateUserInfoAPI(formData);
      setUser(updatedResult)
      const interestArray: Array<Record<string, string>> = [];
      Object.keys(profile.keywords).forEach(key => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const arr = profile.keywords[key as Interest].map(el => {
          return {
            postType: key.toLowerCase(),
            name: el
          }
        });
        interestArray.push(...arr);
      });
      await updateUserInterestAPI(interestArray);
      setStep(prev => prev + 1);

    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className='init-step-3'>
      <ScrollArea>
        <div className='init-step-3-container'>
          {profile.interest.map(el => {
            const payload = INIT_STEP_3[el];
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
          <CheckWave />
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
  );
};
